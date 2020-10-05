<template>
	<v-navigation-drawer app v-model="isSidebarShow">
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="title">
					Application
				</v-list-item-title>
				<v-list-item-subtitle>
					<v-row>
						<v-col>
							<small>Hello,</small>
							<h3 v-text="auth.user.firstName + ' ' + auth.user.lastName"></h3>
						</v-col>
						<v-col cols="auto">
							<v-btn 
								text 
								small 
								color="red" 
								@click="logout"
							>
								Logout
							</v-btn>
						</v-col>
					</v-row>
				</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-divider></v-divider>

		<v-list nav>
			<v-list-item
				v-for="item in items"
				:key="item.title"
				link
				:to="item.to"
			>
				<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	props: ['sidebar'],

	computed: {
		auth () {
			return this.$store.state.auth
		}, 

		isSidebarShow: {
			get () {
				return this.sidebar
			},

			set () {
				//
			}
		}
	},

	data: () => ({
		items: [
			{
				icon: 'mdi-view-dashboard',
				title: 'Dashbord',
				to: '/dashboard'
			},
			{
				icon: 'mdi-format-quote-open',
				title: 'Quotes',
				to: '/quotes'
			}
		]
	}),

	methods: {
		logout () {
			this.$store.commit('auth/remove')
			localStorage.clear()
			this.$nuxt.setLayout('default')
			this.$router.push("/")
		}
	}
}
</script>