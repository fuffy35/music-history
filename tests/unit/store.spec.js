/* --------------------------------------------------------------------------------------------------------- */

import { getters, actions, mutations, utilityForTesting } from '@/store/index.js';
import axios from 'axios';

jest.mock('axios');

/* --------------------------------------------------------------------------------------------------------- */

describe('store.js', () => {
	let dates;
	let datesString;
	let displayedDateData;
	let musicHistory;
	let musicHistoryString;

	// fuffy35: here vs beforeAll()?
	const startBufferHours = -1;
	const endBufferHours = 25;

	beforeAll(() => {
		musicHistory = {
			aStartDate: new Date(2021, 8, 10),//'2021-09-10 00:00',
			aEndDate: new Date(2021, 8, 11, 21),//'2021-09-11 21:00',
			playbacks: [
				{
					album: 'Test Album',
					albumArtist: 'Test Artist',
					artist: 'Test Artist',
					computer: 'Home',
					dbCreated: '',
					dbModified: null,
					filepathRaw: '',
					filesize: 45616820,
					filesizeNatural: '43.5 MB',
					foobar2000version: 'foobar2000 v1.3.10',
					lengthEx: '30:00.072',
					lengthSeconds: 1800,
					songStarted: new Date(2021, 8, 11, 15, 34, 9),//'2021-09-11 15:34:09',
					tempID: 42,
					title: 'Song Title',
					trackArtist: null,
					trackNumber: null
				}
			]
		};

		musicHistoryString = JSON.stringify(musicHistory)
			.replace(/"/g, '&#34;')
			.replace(/'/g, '&#39;')
			.replace(/&amp;/g, "&");

		dates = [
			{ dateString: '2021-09-01' },
			{ dateString: '2021-09-02' },
			{ dateString: '2021-09-03' },
			{ dateString: '2021-09-04' },
			{ dateString: '2021-09-05' }
		];

		datesString = JSON.stringify(dates);

		displayedDateData = {
			dateString: '2021-09-05',
			date: new Date(2021, 8, 5),
			startTimestamp: new Date(2021, 8, 5, startBufferHours),
			endTimestamp: new Date(2021, 8, 5, endBufferHours)
		};
	});

	/* --------------------------------------------------------------------------------------------------------- */

	describe('getters', () => {
		let state;
		beforeEach(() => {
			state = {
				dates: dates,
				displayedDate: displayedDateData,
				playbacks: musicHistory.playbacks,
			};
		});

		test('dates', () => {
			expect(getters.dates(state)).toEqual(dates);
		});

		test('displayedDate', () => {
			expect(getters.displayedDate(state)).toEqual(displayedDateData);
		});

		test('playbacks', () => {
			expect(getters.playbacks(state)).toEqual(musicHistory.playbacks);
		});
	});

	/* --------------------------------------------------------------------------------------------------------- */

	describe('actions', () => {
		test('getDates', async() => {
			const datesOriginal = [...dates];
			const datesProcessed = [
				{
					dateString: '2021-09-05',
					date: new Date(2021, 8, 5),
					startTimestamp: new Date(2021, 8, 5, startBufferHours),
					endTimestamp: new Date(2021, 8, 5, endBufferHours)
				},
				{
					dateString: '2021-09-04',
					date: new Date(2021, 8, 4),
					startTimestamp: new Date(2021, 8, 4, startBufferHours),
					endTimestamp: new Date(2021, 8, 4, endBufferHours)
				},
				{
					dateString: '2021-09-03',
					date: new Date(2021, 8, 3),
					startTimestamp: new Date(2021, 8, 3, startBufferHours),
					endTimestamp: new Date(2021, 8, 3, endBufferHours)
				},
				{
					dateString: '2021-09-02',
					date: new Date(2021, 8, 2),
					startTimestamp: new Date(2021, 8, 2, startBufferHours),
					endTimestamp: new Date(2021, 8, 2, endBufferHours)
				},
				{
					dateString: '2021-09-01',
					date: new Date(2021, 8, 1),
					startTimestamp: new Date(2021, 8, 1, startBufferHours),
					endTimestamp: new Date(2021, 8, 1, endBufferHours)
				}
			];

			axios.get.mockResolvedValue({data: datesOriginal});
			const commit = jest.fn();

			await actions.getDates({ commit });

			expect(commit.mock.calls.length).toBe(2);
			expect(commit.mock.calls).toEqual([
				['SET_DATES', datesProcessed],
				['SET_DISPLAYED_DATE', datesProcessed[0]]
			]);
		});

		test('getPlaybacks', async() => {
			axios.get.mockResolvedValue({data: musicHistoryString});
			const commit = jest.fn();

			await actions.getPlaybacks({ commit });

			expect(commit.mock.calls).toEqual([
				['SET_PLAYBACKS', musicHistory.playbacks]
			]);
		});

		/* ------------------------------------------ */
			// yoink: https://vuex.vuejs.org/guide/testing.html
			// (this is how you'd do the above if you don't have jest.fn() or similar.)
			// (but since we do have that, we can write it in a much shorter way.)
		/* ------------------------------------------ */
		/*
		// helper for testing action with expected mutations
		const testAction = (action, payload, state, expectedMutations, done) => {
			let count = 0;

			// mock commit
			const commit = (mutationType, payload) => {
				const mutation = expectedMutations[count];

				try {
					expect(mutationType).toEqual(mutation.type);
					expect(payload).toEqual(mutation.payload);
				} catch (error) {
					done(error);
				}

				count++;

				if (count >= expectedMutations.length) {
					done();
				}
			}

			// call the action with mocked store and arguments
			action({ commit, state }, payload);

			// check if no mutations should have been dispatched
			if (expectedMutations.length === 0) {
				expect(count).toBe(0);
				done();
			}
		}

		test('getPlaybacks', done => {
			axios.get.mockResolvedValue({data: musicHistoryString});

			// const testAction = (action, payload, state, expectedMutations, done) => {...}
			testAction(
				actions.getPlaybacks,
				null,
				{ playbacks: [] },
				[
					{ type: 'SET_PLAYBACKS', payload: musicHistory.playbacks }
				],
				done
			);
		});
		*/
	});

	/* --------------------------------------------------------------------------------------------------------- */

	describe('mutations', () => {
		let state;
		beforeEach(() => {
			state = {
				dates: [],
				displayedDate: null,
				playbacks: [],
			};
		});

		test('SET_DATES', () => {
			mutations.SET_DATES(state, dates);
			expect(state.dates).toEqual(dates);
		});

		test('SET_DISPLAYED_DATE', () => {
			mutations.SET_DISPLAYED_DATE(state, displayedDateData);
			expect(state.displayedDate).toEqual(displayedDateData);
		});

		test('SET_PLAYBACKS', () => {
			mutations.SET_PLAYBACKS(state, musicHistory.playbacks);
			expect(state.playbacks).toEqual(musicHistory.playbacks);
		});
	});

	/* --------------------------------------------------------------------------------------------------------- */

	// utilityForTesting
	describe('utility', () => {
		test('addBookendTimes with string', () => {
			const originalDateData = { dateString: displayedDateData.dateString };
			utilityForTesting.addBookendTimes(originalDateData);
			expect(originalDateData).toEqual(displayedDateData);
		});

		test('addBookendTimes with non-midnight date', () => {
			const originalDateData = {
				//dateString: displayedDateData.dateString,
				date: new Date(displayedDateData.date.getTime() + 5*60*60*1000) // add 5 hours.
			};
			utilityForTesting.addBookendTimes(originalDateData);
			expect(originalDateData).toEqual(displayedDateData);
		});
	});

	/* --------------------------------------------------------------------------------------------------------- */
});


/* --------------------------------------------------------------------------------------------------------- */
