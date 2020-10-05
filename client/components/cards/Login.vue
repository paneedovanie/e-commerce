<template>
	<v-card>
		<v-card-title>Login</v-card-title>
		<v-card-text>
			<v-alert
				dense
				outlined
				type="error"
				v-for="error in errors"
				:key="error"
				v-text="error"
			>
			</v-alert>
			<v-form 
				:disabled="submitting"
				@submit.prevent="submitLogin"
			>
				<v-text-field
					label="Username"
					v-model="form.username"
				></v-text-field>
				<v-text-field
					label="Password"
					type="password"
					v-model="form.password"
				></v-text-field>
				<v-btn 
					type="submit" 
					color="primary"
					:loading="submitting"
				>Submit</v-btn>
			</v-form>
		</v-card-text>
	</v-card>
</template>
<script>
import api from '@/assets/api'
import axios from 'axios'

export default {
  data: () => ({
		errors: [],
		submitting: false,
    form: {
      username: '',
      password: ''
    }
	}),
	
  methods: {
    submitLogin () {
			this.errors = []
			this.submitting = true

      axios.post(api.user.login(), this.form)
				.then(response => {
					this.$store.commit('auth/set', response.data)
					this.$nuxt.setLayout('user')
					this.$router.push('/dashboard')
					localStorage.setItem('user', JSON.stringify(response.data.user))
					localStorage.setItem('token', response.data.token)
				})
				.catch(err => {
					this.errors = err.response.data.errors
				})
				.finally(() => {
					this.submitting = false
				})
		}
	},
}
</script>