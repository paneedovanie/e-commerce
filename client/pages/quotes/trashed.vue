<template>
	<div>
		<page-header>
			<template v-slot:title>Trashed <v-btn text color="primary" to="/quotes">See Quotes</v-btn></template>
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
					<div v-text="item.content" class="text-truncate" style="max-width: 20rem"></div>
				</template>
				<template v-slot:item.action="{ item }">
					<v-btn small icon><v-icon small @click="restoreQuote(item._id)">mdi-restore</v-icon></v-btn>
					<v-btn small icon><v-icon small @click="deleteQuote(item._id)">mdi-delete</v-icon></v-btn>
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
			{ text: 'Deleted', value: 'deletedAt' },
			{ text: 'Action' , value: 'action', sortable: false }
		],
	}),

	methods: {
		getQuotes () {
			axios.get(api.quote.trashed(), {
				params: {
					user: this.auth.user._id
				},
				headers: {
					"auth-token": this.auth.token
				}
			}).then(response => {
				this.quotes = response.data
			}).catch(err => {
				console.error(err.response)
			}).finally(() => {
				this.loading = false
			})
		},

    restoreQuote (id) {
			axios.patch(api.quote.restore(id))
			.then(response => {
				// this.laoding = false
				this.$store.commit('snackbar/set', {
					show: true,
					text: "Quote restored"
				})
				this.getQuotes()
			}).catch(err => {
				console.error(err)
			})
    },

    deleteQuote (id) {
			axios.delete(api.quote.main(id))
			.then(response => {
				// this.laoding = false
				this.$store.commit('snackbar/set', {
					show: true,
					text: "Quote deleted"
				})
				this.getQuotes()
			}).catch(err => {
				console.error(err)
			})
    }
	},

	mounted() {
		console.log(this.$route)
		this.getQuotes()
	}
}
</script>