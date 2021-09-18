<template>
	<div class="columns">
		<div class="column is-narrow">
			<Dates header="Song Dates" />
		</div>
		<div class="column section-border playbacks">
			<h1 class="title is-4">Playbacks</h1>
			<ul>
				<li v-for="playback in playbacks" :key="playback.tempID" class="playback">
					<span class="playbackTime" :class="{ differentDate: !isPlaybackOnDisplayedDate(playback) }">
						{{ getPlaybackDisplayTime(playback) }}
					</span>
					{{ getPlaybackDisplayText(playback) }}
				</li>
			</ul>
		</div>
		<div class="lyric">
			~ i wasn't meant to love like this, not without you ~
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import utility from '@/utility';
	import Dates from '@/components/Dates.vue';
	// import Playbacks from '@/components/Playbacks.vue'; // fuffy35: put playbacks into its own component.

	export default {
		name: 'Home',
		components: {
			Dates
		},
		computed: {
			...mapGetters([
				'displayedDate',
				'playbacks'
			]),
		},
		created() {
			this.getPlaybacks();
		},
		methods: {
			...mapActions(['getPlaybacks']),
			getPlaybackDisplayTime(playback) {
				return utility.date.formatTime12Hour(playback.songStarted);
			},
			getPlaybackDisplayText(playback) {
				return `${playback.artist ? playback.artist : '{no artist set}'} ~ ${playback.title}`;
			},
			isPlaybackOnDisplayedDate(playback) {
				// fuffy35: consider dateReviver like dateTimeReviver.
				const playbackDate = utility.date.formatDate(playback.songStarted);
				return playbackDate === this.displayedDate.dateString;
			}
		}
	};
</script>

<style scoped>
	/* ------------------------------------------ */

	.playbacks {
		border-width: 0 0 0 1px;
	}

	.playbackTime {
		color: var(--text-meta);
		display: inline-block;
		font-family: monospace;
		margin-right: 1em;
	}
	.playbackTime.differentDate {
		/* since i'm showing stuff from a bit before and after midnight... this is to differentiate. */
		opacity: 0.55;
	}

	/* ------------------------------------------ */

	.lyric {
		writing-mode: vertical-rl;
		text-orientation: mixed;
		position: fixed;
		right: 0.5em;
		top: 30%;
		/* rainbow text :3 */
		background: -webkit-linear-gradient(
			top,
			#f00, #ffa500, #ff0, #0f0, #06c, #909,
			#f00, #ffa500, #ff0, #0f0, #06c, #909,
			#f00, #ffa500, #ff0, #0f0, #06c, #909
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	/* ------------------------------------------ */
</style>
