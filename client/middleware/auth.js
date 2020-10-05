export default function ({ store, error }) {
	if (!store.state.auth.user) {
		error({
			message: '',
			statusCode: 200
		})
	}
}
