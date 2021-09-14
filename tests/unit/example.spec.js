/* --------------------------------------------------------------------------------------------------------- */

import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

import { state, getters, actions, mutations } from '@/store/index.js';
import axios from 'axios';

/* --------------------------------------------------------------------------------------------------------- */

describe('HelloWorld.vue', () => {
	it('renders props.msg when passed', () => {
		const msg = 'new message';
		const wrapper = shallowMount(HelloWorld, {
			props: { msg }
		});
		expect(wrapper.text()).toMatch(msg);
	});
});

/* --------------------------------------------------------------------------------------------------------- */

jest.mock('axios');

describe('store.js', () => {
	let musicHistory;
	let musicHistoryString;

	beforeAll(() => {
		musicHistory = {
			aStartDate: '2021-09-10 00:00',
			aEndDate: '2021-09-11 21:00',
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
					songStarted: '2021-09-11 15:34:09',
					tempID: 42,
					title: 'Song Title',
					trackArtist: null,
					trackNumber: null
				}
			]
		};

		musicHistoryString = JSON.stringify(musicHistory)
			.replace(/"/g, '&#34;')
			.replace(/'/g, '&#39;');
	});

	/* --------------------------------------------------------------------------------------------------------- */

	describe('getters', () => {
		test('playbacks', () => {
			const state = { playbacks: musicHistory.playbacks };
			expect(getters.playbacks(state)).toEqual(musicHistory.playbacks);
		});
	});

	/* --------------------------------------------------------------------------------------------------------- */

	describe('actions', () => {

		/* ------------------------------------------ */

		test('getPlaybacks', async() => {
			axios.get.mockResolvedValue({data: musicHistoryString});

			const commit = jest.fn();

			await actions.getPlaybacks({ commit });

			/*
			console.log(commit.mock);
				console.log tests/unit/example.spec.js:137
				  { calls: [ [ 'SET_PLAYBACKS', [Array] ] ],
				    instances: [ undefined ],
				    invocationCallOrder: [ 2 ],
				    results: [ { type: 'return', value: undefined } ] }
			*/
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
		test('SET_PLAYBACKS', () => {
			const state = { playbacks: [] };
			mutations.SET_PLAYBACKS(state, musicHistory.playbacks);
			expect(state.playbacks).toEqual(musicHistory.playbacks);
		});
	});
});

/* --------------------------------------------------------------------------------------------------------- */
