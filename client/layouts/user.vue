<template>
  <v-app>
    <user-navigation-drawer :sidebar="sidebar" />

    <user-appbar @toggle-sidebar="toggleSidebar" />

    <!-- Sizes your content based upon application components -->
    <v-main>
			<snack-bar></snack-bar>
			<!-- If using vue-router -->
			<v-container>
				<nuxt />
			</v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
	components: {
		userAppbar: () => import('./partials/userAppbar'),
		userNavigationDrawer: () => import('./partials/userNavigationDrawer')
	},

	computed: {
		auth () {
			return this.$store.state.auth
		}
	},

	data: () => ({
		sidebar: true
	}),

	methods: {
		toggleSidebar () {
			this.sidebar = !this.sidebar
		}
	}
}
</script>