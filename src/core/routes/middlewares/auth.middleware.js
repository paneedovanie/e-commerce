const UserController = require( __srcdir + 'modules/User/controllers/user.controller' )
const permissionController = require( __srcdir + 'modules/Permission/controllers/permission.controller' )
const rolePermissionController = require( __srcdir + 'modules/Role/submodules/Permission/controllers/rolePermission.controller' )
const jwt = require('jsonwebtoken');

module.exports.auth = function (code = '') {
	return async (req, res, next) => {
		if(process.env.NODE_ENV === 'test') {
			next();
		} else {
			const token = req.header('Authorization').replace('Bearer ', '')
			if(!jwt.JsonWebTokenError) return res.status(401).json({ errors: ['Access denied!'] })
	
			try{
				const validated = jwt.verify(token, process.env.TOKEN_SECRET)
				
				if(validated._id) {
					req.user = await UserController.readOneById(validated._id)
					if(!req.user) return res.status(400).json({ errors: ['Invalid token'] })

					const permission_id = await permissionController.readOneByQuery({ code: code })
					const hasPermission = await rolePermissionController.readOneByQuery({role: req.user.role, permission: permission_id})
					
					if(!hasPermission) return res.status(403).json({ errors: [ 'No permission to access this!' ] })
					next();
				} 
				else return res.status(400).json({ errors: ['Invalid token'] })
			}catch(err){
					res.status(400).json({ errors: ['Invalid token'] })
			}
		}
	}
}