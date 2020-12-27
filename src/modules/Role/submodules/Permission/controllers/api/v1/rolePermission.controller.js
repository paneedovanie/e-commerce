const ApiController = require(__srcdir + 'core/controllers/api/api.controller')
const rolePermissionController = require(`../../rolePermission.controller`)

class ApiRolePermissionController extends ApiController {
	constructor (props) {
		super(props)
	}
}

module.exports = new ApiRolePermissionController(rolePermissionController)