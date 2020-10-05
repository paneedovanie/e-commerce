<template>
	<v-app-bar
		app
		absolute
		color="primary"
		dark
		elevate-on-scroll
	>
		<v-app-bar-nav-icon @click="$emit('toggle-sidebar')"></v-app-bar-nav-icon>
	</v-app-bar>
</template>