/* --------------------------------------------------------------------------------------------------------- */

import { createStore } from 'vuex';
import axios from 'axios';

/* --------------------------------------------------------------------------------------------------------- */

const jsonHackFix = htmlEntityJson => {
	// i'm not going to start looking into why /music-json/ comes back as a string instead of an object.
	// possibly it's a very quick fix, but for now i don't want to get sidetracked for hours,
	// trying to fix something that just needs to exist/be usable so i can use its output for learning other stuff.
	var fixedJsonString = htmlEntityJson
		.replace(/&#34;/g, '"')
		.replace(/&#39;/g, "'");

	return JSON.parse(fixedJsonString);
};

const getMusicHistory = async() => {
	const notQuiteJson = await axios.get('/music-json/');
	const responseData = jsonHackFix(notQuiteJson.data);
	return {
		startDate: responseData.aStartDate,
		endDate: responseData.aEndDate,
		playbacks: responseData.playbacks
	};
};

/* --------------------------------------------------------------------------------------------------------- */

const state = {
	playbacks: []
};

/* --------------------------------------------------------------------------------------------------------- */

const getters = {
	playbacks: state => state.playbacks
};

/* --------------------------------------------------------------------------------------------------------- */

const actions = {
	async getPlaybacks({ commit }) {
		try {
			const musicHistory = await getMusicHistory();
			commit('SET_PLAYBACKS', musicHistory.playbacks);
		}
		catch (error) {
			console.log(error);
		}
	}
};

/* --------------------------------------------------------------------------------------------------------- */

const mutations = {
	SET_PLAYBACKS(state, payload) {
		state.playbacks = payload;
	}
};

/* --------------------------------------------------------------------------------------------------------- */

export default createStore({
	state,
	getters,
	actions,
	mutations
});

/* --------------------------------------------------------------------------------------------------------- */
