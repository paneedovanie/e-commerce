<template>
	<v-snackbar
		:value="snackbar.show"
		:timeout="snackbar.timeout"
		top
		@input="hide"
	>
		{{ snackbar.text }}

		<template v-slot:action="{ attrs }">
			<v-btn
				color="blue"
				text
				v-bind="attrs"
				@click="hide"
			>
				Close
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
export default {
	computed: {
		snackbar() {
			return this.$store.state.snackbar
		}
	},

	methods: {
		hide (e) {
			this.$store.commit('snackbar/set', {
				show: false
			})
		}
	},
}
</script>