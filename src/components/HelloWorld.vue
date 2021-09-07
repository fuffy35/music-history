<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		props: {
			msg: String,
			status: {
				type: String,
				required: false,
				validator: function (value) {
					return [
						'syncing',
						'synced',
						'version-conflict',
						'error'
					].indexOf(value) !== -1
				}
			}
		},
		computed() {
		},
		data() {
			return {
				newNote: '',
			}
		},
	};
</script>
