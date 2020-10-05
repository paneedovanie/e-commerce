export const state = () => ({
	token: null,
	user: null
})

export const mutations = {
	set(state, { token, user }) {
		state.token = token
		state.user = user
	},

	remove(state) {
		state.token = null
		state.user = null
	}
}