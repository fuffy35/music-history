<template>
	<div class="dates">
		<h1 class="title is-4">{{ header }}</h1>
		<ul>
			<li
				v-for="dateData in subsetOfDates"
				:key="dateData.date"
				@click="displayPlaybacks(dateData)"
				class="date"
				:class="{ displayed: this.isDisplayedDate(dateData) }"
			>
				{{ dateData.dateString }}
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import utility from '@/utility';

	export default {
		name: 'Dates',
		props: {
			header: String,
		},
		computed: {
			...mapGetters([
				'dates',
				'displayedDate'
			]),
			subsetOfDates() {
				const today = utility.date.todayAtMidnight();

				// arbitrary: allow picking from the last 42 days to see which songs i listened to.
				// (should be replaced later by a calendar or date picker or something, tbd.)
				const fortyTwoDaysAgo = new Date(today.getTime() - 42*(24*60*60*1000));

				return this.dates.filter(dateData => dateData.date > fortyTwoDaysAgo && dateData.date <= today);
			},
		},
		created() {
			this.getDates();
		},
		methods: {
			...mapActions([
				'getDates',
				'setDisplayedDate',
				'getPlaybacks'
			]),
			displayPlaybacks(dateData) {
				this.setDisplayedDate(dateData);
				this.getPlaybacks(dateData);
			},
			isDisplayedDate(dateData) {
				return dateData === this.displayedDate;
			},
		},
	};
</script>

<style scoped>
	.dates {
		text-align: center;
	}

	.date {
		color: var(--link-plain);
		cursor: pointer;
	}
	.date:hover {
		color: var(--link-hover);
	}

	.date.displayed {
		color: var(--link-visited);
	}
</style>
