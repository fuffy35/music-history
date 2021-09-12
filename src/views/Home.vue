<template>
	<div class="home">
		<HelloWorld msg="Welcome to Your Vue.js App"/>
	</div>
	<div class="columns">
		<div class="column">
			hi
		</div>
		<div class="column">
			hi
		</div>
	</div>
	<div>
		<ul>
			<li v-for="playback in playbacks" :key="playback.tempID">
				{{ playback.artist }} ~ {{ playback.title }}
			</li>
		</ul>
	</div>
</template>

<script>
	/*
		{
		album: "Album",
		albumArtist: "Often the same as artist",
		artist: "Artist",
		computer: ..., (home or work)
		dbCreated: "2021-09-11 15:34:09",
		dbModified: null,
		filepathRaw: "file://C:\...path...\filename.mp3",
		filesize: 45616820,
		filesizeNatural: "43.5 MB",
		foobar2000version: "foobar2000 v1.3.10",
		lengthEx: "30:00.072",
		lengthSeconds: 1800,
		songStarted: "2021-09-11 15:34:09",
		tempID: 42,
		title: "Song Title",
		trackArtist: null,
		trackNumber: null
		},
	*/
	import { mapGetters, mapActions } from 'vuex';
	import HelloWorld from '@/components/HelloWorld.vue';

	export default {
		name: 'Home',
		components: {
			HelloWorld
		},
		computed: {
			...mapGetters(['playbacks'])
		},
		created() {
			this.getPlaybacks();
		},
		methods: {
			...mapActions(['getPlaybacks'])
		}
	};
</script>
