<template>
	<div>
		<h1 v-if="!logged">Logging in...</h1>
	</div>
</template>

<script>
import api from '@/assets/api'
import axios from 'axios'

export default {
	data: () => ({
		logged: false
	}),

	mounted () {
		const token = localStorage.getItem('token')
		const user = JSON.parse(localStorage.getItem('user'))

		axios.get(api.user.main(user._id), {
			headers: {
				"auth-token": token
			}
		})
		.then( response => {
			this.$store.commit('auth/set', { user: response.data, token: token} )
			this.$nuxt.setLayout('user')
			if(this.$route.query.from) {
				if(this.$route.query.from === '/' || this.$route.query.from === '/login')
					this.$router.push('dashboard')
				else
					this.$router.push(this.$route.query.from)
			}
		})
		.catch(err => {
			console.error(err)
		})
		.finally(() => {
			this.$router.push('/')
		})
	}
}
</script>