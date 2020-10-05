const suffix = '/api/v1'

export default {
	user: {
		main (id) {
			return suffix + '/users' + (id ? `/${id}` : '')
		},

		register () {
			return suffix + '/users/register'
		},

		login () {
			return suffix + '/users/login'
		}
	},

	quote: {
		main (id) {
			return suffix + '/quotes' + (id ? `/${id}` : '')
		},

		restore (id) {
			return suffix + `/quotes/${id}/restore`
		},

		trash (id) {
			return suffix + `/quotes/${id}/trash`
		},

		trashed () {
			return suffix + '/quotes/trashed'
		}
	}
}