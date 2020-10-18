const Crud = require(__srcdir + '/services/crud.service')

module.exports = class UserController extends Crud {
	constructor (props) {
		super(props)
	}
}