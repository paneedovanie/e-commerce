<template>
	<v-app-bar
		app
		absolute
		color="primary"
		dark
		elevate-on-scroll
	>
		<v-container class="d-flex align-center">
			<v-toolbar-title>Application</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn text to="/">
				Home
			</v-btn>

			<v-btn text to="about">
				About
			</v-btn>
		</v-container>
	</v-app-bar>
</template>