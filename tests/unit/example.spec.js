/* --------------------------------------------------------------------------------------------------------- */

import { shallowMount } from '@vue/test-utils';
//import HelloWorld from '@/components/HelloWorld.vue';

/* --------------------------------------------------------------------------------------------------------- */

// describe('HelloWorld.vue', () => {
// 	it('renders props.msg when passed', () => {
// 		const msg = 'new message';
// 		const wrapper = shallowMount(HelloWorld, {
// 			props: { msg }
// 		});
// 		expect(wrapper.text()).toMatch(msg);
// 	});
// });

describe('your test suite must contain at least one test', () => {
	test('here is your test, are you happy now?', () => {
		expect('test').toMatch('test');
	});
});

/* --------------------------------------------------------------------------------------------------------- */

// https://stackoverflow.com/questions/51796290/jest-not-outputting-describe-names-nor-test-names-when-more-than-one-test-file
/*
You can run multiple tests with the --verbose flag (as mentioned by Geoffrey Hale in his answer).

You can tell the command line to pass the flag to jest (instead of npm) with --:

npm run test -- --verbose
*/

/* --------------------------------------------------------------------------------------------------------- */
