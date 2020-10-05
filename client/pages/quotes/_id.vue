<template>
	<div>
		<page-header>
			<template v-slot:title>Show <v-btn text color="primary" to="/quotes">See quotes</v-btn></template>
		</page-header>
		<v-card v-if="quotes">
			<v-card-title v-text="quotes.content"></v-card-title>
			<v-card-text>
				<p>By {{ quotes.originator.name }} <a :href="quotes.url" target="_targer">Source</a></p>
				<p>Created {{ quotes.createdAt }}</p>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import axios from 'axios'
import api from '@/assets/api'

export default {
	layout: 'user',
	middleware: 'auth',

	head: () =>  ({
		title: 'Quotes'
	}),

	computed: {
		auth () {
			return this.$store.state.auth
		}
	},

	data: () => ({
		loading: true,
		quotes: null,
		search: '',
		headers: [
			{
				text: 'Content',
				align: 'start',
				sortable: false,
				value: 'content',
			},
			{ text: 'Author', value: 'originator.name' },
			{ text: 'Added', value: 'createdAt' },
			{ text: 'Action' , value: 'action', sortable: false }
		],
	}),

	methods: {
		getQuotes () {
			axios.get(api.quote.main(this.$route.params.id), {
				headers: {
					"auth-token": this.auth.token
				}
			}).then(response => {
				this.quotes = response.data
				console.log(this.quotes)
			}).catch(err => {
				console.error(err.response)
			}).finally(() => {
				this.loading = false
			})
		},

    trashQuote (id) {
			axios.patch(api.quote.trash(id))
			.then(response => {
				// this.laoding = false
				this.getQuotes()
			}).catch(err => {
				console.error(err)
			})
    }
	},

	mounted() {
		this.getQuotes()
	}
}
</script>