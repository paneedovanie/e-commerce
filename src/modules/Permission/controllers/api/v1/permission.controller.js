const ApiController = require(__srcdir + 'core/controllers/api/api.controller')
const Permission = require(`${ __srcdir }modules/Permission/models/Permission`)

class PermissionController extends ApiController {
	constructor (props) {
		super(props)
	}
}

module.exports = new PermissionController(Permission)