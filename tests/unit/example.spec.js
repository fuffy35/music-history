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
	const musicHistory = {
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

	test('store.state', () => {
		console.log(state);
	});
	test('store.getters', () => {
		console.log(getters);
	});
	test('store.actions', () => {
		console.log(actions);
	});
	test('store.mutations', () => {
		console.log(mutations);
	});

	describe('mutations', () => {
		test('SET_PLAYBACKS', () => {
			const state = { playbacks: [] };
			mutations.SET_PLAYBACKS(state, musicHistory.playbacks);
			expect(state.playbacks).toEqual(musicHistory.playbacks);
		});
	});

	test('should fetch music history', () => {
		axios.get.mockResolvedValue({data: musicHistory});

		//console.log(mutations);
		//store.actions.getPlaybacks();
		//console.log(getters.playbacks);
	});
});

/* --------------------------------------------------------------------------------------------------------- */
