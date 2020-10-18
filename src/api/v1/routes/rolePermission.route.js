const router = require('express').Router()
const RolePermission = require( __srcdir + '/models/RolePermission' )
const rolePermissionController = new ApiController(RolePermission)
const { auth } = require('./middlewares/auth.middleware')
const { checkIfValidId, rolePermissionValidation } = require('./middlewares/rolePermission.middleware')

router.post(
	'/', 
	[ auth('rolePermission.create'), rolePermissionValidation ] ,
	rolePermissionController.createOne.bind(rolePermissionController)
)

router.get(
	'/', 
	auth('rolePermission.read'),
	rolePermissionController.readAll.bind(rolePermissionController)
)

router.get(
	'/trashed', 
	auth('rolePermission.trashed'),
	rolePermissionController.readAllTrash.bind(rolePermissionController)
)

router.get(
	'/:id', 
	[ auth('rolePermission.read'), checkIfValidId ],
	rolePermissionController.readOneById.bind(rolePermissionController)
)
	
router.patch(
	'/:id',
	[auth('rolePermission.update'), checkIfValidId, rolePermissionValidation ],
	rolePermissionController.updateOne.bind(rolePermissionController)
)

router.patch(
	'/:id/trash', 
	[ auth('rolePermission.trash'), checkIfValidId ],
	rolePermissionController.trashOne.bind(rolePermissionController)
)

router.patch(
	'/:id/restore', 
	[ auth('rolePermission.restore'), checkIfValidId ],
	rolePermissionController.restoreOne.bind(rolePermissionController)
)

router.delete(
	'/:id', 
	[ auth('rolePermission.delete'), checkIfValidId ],
	rolePermissionController.deleteOnePermanently.bind(rolePermissionController)
)

module.exports = router