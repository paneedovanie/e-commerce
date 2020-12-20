const ApiController = require(__srcdir + 'core/controllers/api/api.controller')
const Role = require(`${ __srcdir }modules/Role/models/Role`)

class RoleController extends ApiController {
	constructor (props) {
		super(props)
	}
}

module.exports = new RoleController(Role)