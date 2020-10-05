<template>
	<div>
		<page-header>
			<template v-slot:title>Quotes <v-btn text color="red" to="quotes/trashed">See trashed</v-btn></template>
		</page-header>
		<v-card>
			<v-card-title>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
			<v-data-table
				:headers="headers"
				:items="quotes"
				:search="search"
				:loading="loading"
			>
				<template v-slot:item.content="{ item }">
					<div class="text-truncate" style="max-width: 20rem"><nuxt-link v-text="item.content" :to="`/quotes/${item._id}`"></nuxt-link></div>
				</template>
				<template v-slot:item.action="{ item }">
					<v-btn small icon><v-icon small @click="trashQuote(item._id)">mdi-delete</v-icon></v-btn>
				</template>
			</v-data-table>
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
		quotes: [],
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
			axios.get(api.quote.main(), {
				params: {
					user: this.auth.user._id
				},
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
				this.$store.commit('snackbar/set', {
					show: true,
					text: "Quote trashed"
				})
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