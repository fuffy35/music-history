<template>
	<div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link> |
		<router-link to="/404">404</router-link>
	</div>
	<router-view />
</template>

/*
	bulma columns:
		https://bulma.io/documentation/columns/sizes/
		sizes:
			is-three-quarters
			is-two-thirds
			is-half
			is-one-third
			is-one-quarter
			is-full
			is-four-fifths
			is-three-fifths
			is-two-fifths
			is-one-fifth
			is-narrow // only take as much space as needed, and have other(s) fill the rest.
				.is-narrow-mobile
				.is-narrow-tablet
				.is-narrow-touch
				.is-narrow-desktop
				.is-narrow-widescreen
				.is-narrow-fullhd
		count:
			up to is-12
		horizontal spacing:
			is-offset-8
		devices: "By default, columns are only activated from tablet onwards. This means columns are stacked on top of each other on mobile."
			// mobile, tablet, desktop, widescreen, fullhd. others?
			is-mobile // makes columns work on mobile
			is-desktop // makes columns only work on >= desktop
			these can be added onto the sizes:
				is-three-quarters-mobile
				is-two-thirds-tablet
				is-half-desktop
				is-one-third-widescreen
				is-one-quarter-fullhd
		column gap stuff, i didn't read it yet
		other stuff:
			is-vcentered // align columns vertically
			is-multiline // if the columns have to wrap and fill a second line
*/

<style lang="stylus">
	:root {
		/* https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables */
		--bgcolor: black;
		--text-plain: #630 /*#080*/;
		--text-bold: #636 /*369*/;
		--text-code: #606 /*#75f*/;
		--text-heading: #6f3812 /*#D2691E #085*/;
		--link-plain: #660 /*#277EF5*/;
		--link-visited: #9a34b7; /* #C32FED */
		--link-hover: #A52A2A /*#FF4040*/;
		--border-default: #410 /*#0a0*/;
		--border-light: var(--text-plain);
		--input-disabled: #c00;
	}

	html, body {
		background: black;
		color: var(--text-plain);
		text-align: center;
	}

	a, a:link, a *, a:link * { color: var(--link-plain); }
	a:visited, a:visited * { color: var(--link-visited); }
	a:hover, a:hover * { color: var(--link-hover); }
</style>
