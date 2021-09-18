<template>
	<div id="nav" class="nav section-border">
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link> |
		<router-link to="/404">404</router-link>
	</div>
	<div>
		<router-view />
	</div>
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
	/* ------------------------------------------ */

	:root {
		/* https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables */
		--bgcolor: black;
		--text-plain: #630;
		--text-bold: #636;
		--text-code: #606;
		--text-heading: #410;
		--text-meta: var(--text-heading);
		--link-plain: #660;
		--link-visited: #9a34b7;
		--link-hover: #a52a2a;
		--border-default: var(--text-heading);
		--border-light: var(--text-plain);
		--input-disabled: #c00;
		/*
			not currently used in chrome.stylus but i still like them:
				dimmed light blue
				#369
				purple (blue-tinged)
				#75f
				orange (too bright)
				#d2691e
				green (mildly aqua? blue-tinged)
				#085
				red (orange-tinged? salmon? coral? idk, lol.)
				#ff4040
		*/
	}

	/* ------------------------------------------ */

	html, body {
		background: var(--bgcolor);
		color: var(--text-plain);
	}

	a, a:link, a *, a:link * { color: var(--link-plain); }
	a:visited, a:visited * { color: var(--link-visited); }
	a:hover, a:hover * { color: var(--link-hover); }

	.title.is-4 { color: var(--text-heading); }

	/* ------------------------------------------ */

	.section-border {
		border: dotted 1px var(--border-default);
	}

	.nav {
		text-align: center;
		border-width: 0 0 1px 0;
		padding: 0.5em;
		margin-bottom: 1em;
	}

	/* ------------------------------------------ */
</style>
