<template>
	<div v-if="quotes" class="quotes pa-4 d-flex">
		<div class="quotes_actions">  
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						icon 
						@click="saveQuote()" 
						class="primary mx-2" 
						dark
						v-bind="attrs"
						v-on="on"
					>
						<v-icon>mdi-format-quote-open</v-icon>
					</v-btn>
				</template>
				<span>Save quote</span>
			</v-tooltip>
		</div>
		<div class="quotes_details">
			<h3 class="quotes_content"><i v-text="quotes.content"></i></h3>
			<small class="quote_originator">- <span v-text="quotes.originator.name"></span> <a :href="quotes.originator.url" target="_blank" rel="noopener noreferrer">Source</a></small>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import api from '@/assets/api'

export default {
	computed: {
		auth () {
			return this.$store.state.auth
		}
	},

	data: () => ({
		quotes: null
	}),

  methods: {
    getQuote () {
			axios.get("https://quotes15.p.rapidapi.com/quotes/random/", {
				query: {
					"language_code": "en"
				},
				headers: {
					"x-rapidapi-host": "quotes15.p.rapidapi.com",
					"x-rapidapi-key": "3f33a7e76bmshfc8dad3656a14fep1c2023jsn0b29a122316b",
					"useQueryString": true
				}
			}).then(response => {
				this.quotes = response.data
				// this.setState({quotes: response.data})
			}).catch(err => {
				console.error(err.response)
			})
    },

    saveQuote () {
			const quotes = this.quotes

			this.saving = true

			axios.post(api.quote.main(), {
				user: this.auth.user._id,
				quote_id: quotes.id,
				content: quotes.content,
				originator: quotes.originator,
				url: quotes.url,
				tags: quotes.tags
			}).then(response => {
				this.$store.commit('snackbar/set', {
					show: true,
					text: "Quote saved"
				})
				this.saving = false
			}).catch(err => {
				console.error(err)
			})
    }
	},

	mounted () {
		this.getQuote()
	}
}
</script>

<style lang="scss">
.quotes {
	box-shadow: 0 0.3rem 0.3rem $shadow-color;

	.quotes_content {
		font-family: 'Roboto Slab';
	}
}
</style>