export const state = () => ({
	show: false,
	text: '',
	timeout: 3000
})

export const mutations = {
	set( state, { show, text, timeout }) {
		state.show = show
		state.text = text
		state.timeout = timeout
	}
}