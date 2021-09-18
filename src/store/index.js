/* --------------------------------------------------------------------------------------------------------- */

import { createStore } from 'vuex';
import axios from 'axios';
import utility from '@/utility';

// fuffy35
// https://vuex.vuejs.org/guide/structure.html
// refer back to that when this starts getting bigger and i need to split it into modules.

/* --------------------------------------------------------------------------------------------------------- */

function jsonHackFix(htmlEntityJson) {
	// i'm not going to start looking into why /music-json/ comes back as a string instead of an object.
	// possibly it's a very quick fix, but for now i don't want to get sidetracked for hours,
	// trying to fix something that just needs to exist/be usable so i can use its output for learning other stuff.
	var fixedJsonString = htmlEntityJson
		.replace(/&#34;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, "&");

	return JSON.parse(fixedJsonString, utility.date.jsonDateTimeReviver);
}

async function getMusicHistory(dateData) {
	const notQuiteJson = await axios.get('/music-json/', {
		params: {
			startDate: utility.date.formatDateTime24Hour(dateData.startTimestamp),
			endDate: utility.date.formatDateTime24Hour(dateData.endTimestamp)
			// why i'm formatting them first:
			// if i pass startTimestamp & endTimestamp directly, they're sent as utc.
			// i want to send them as my local time, since when i originally set up logging playbacks in 2016,
			// i was a derp and didn't know any better than to store local time with no timezone attached in my db.
		}
	});

	const responseData = jsonHackFix(notQuiteJson.data);

	return {
		startTimestamp: responseData.aStartDate,
		endTimestamp: responseData.aEndDate,
		playbacks: responseData.playbacks
	};
}

const oneHourInMilliseconds = 60*60*1000;
function addBookendTimes(dateData) {
	if (!('date' in dateData)) {
		dateData.date = utility.date.stringToDate(dateData.dateString);
	}
	else {
		dateData.date.setHours(0, 0, 0, 0);

		// this is not (currently) needed but object consistency makes my brain happier:
		dateData.dateString = utility.date.formatDate(dateData.date);
	}

	dateData.startTimestamp = new Date(dateData.date.getTime() - oneHourInMilliseconds);
	dateData.endTimestamp = new Date(dateData.date.getTime() + 25*oneHourInMilliseconds);
}

export const utilityForTesting = {
	addBookendTimes
};

/* --------------------------------------------------------------------------------------------------------- */

const state = {
	dates: [],
	displayedDate: null,
	playbacks: [],
};

/* --------------------------------------------------------------------------------------------------------- */

export const getters = {
	// fuffy35: https://codeburst.io/vuex-getters-are-great-but-dont-overuse-them-9c946689b414
	dates: state => state.dates,
	displayedDate: state => state.displayedDate,
	playbacks: state => state.playbacks,
};

/* --------------------------------------------------------------------------------------------------------- */

export const actions = {
	async getDates({ commit }) {
		try {
			const response = await axios.get('/api/dates/');

			const dates = response.data.reverse();

			dates.forEach(dateData => addBookendTimes(dateData));

			commit('SET_DATES', dates);
			commit('SET_DISPLAYED_DATE', dates[0]);
		}
		catch (error) {
			console.log(error);
		}
	},

	setDisplayedDate({ commit }, payload) {
		commit('SET_DISPLAYED_DATE', payload); // fuffy35: change it so we don't have to call getPlaybacks separately, i think.
	},

	async getPlaybacks({ commit }, payload) {
		let requestedDateData = payload;

		if (!requestedDateData) {
			requestedDateData = { date: new Date() };
			addBookendTimes(requestedDateData);
		}

		try {
			const musicHistory = await getMusicHistory(requestedDateData);
			commit('SET_PLAYBACKS', musicHistory.playbacks);// fuffy35: .reverse()); tbd.
		}
		catch (error) {
			console.log(error);
		}
	},
};

/* --------------------------------------------------------------------------------------------------------- */

export const mutations = {
	SET_DATES(state, payload) {
		state.dates = payload;
	},
	SET_DISPLAYED_DATE(state, payload) {
		state.displayedDate = payload;
	},
	SET_PLAYBACKS(state, payload) {
		state.playbacks = payload;
	},
};

/* --------------------------------------------------------------------------------------------------------- */

export default createStore({
	state,
	getters,
	actions,
	mutations
});

/* --------------------------------------------------------------------------------------------------------- */
