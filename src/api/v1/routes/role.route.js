const router = require('express').Router()
const Role = require( __srcdir + '/models/Role' )
const roleController = new ApiController(Role)
const { auth } = require('./middlewares/auth.middleware')
const { checkIfValidId, roleValidation } = require('./middlewares/role.middleware')

router.post(
	'/', 
	[ auth('role.create'), roleValidation ],
	roleController.createOne.bind(roleController)
)

router.get(
	'/', 
	auth('role.read'),
	roleController.readAll.bind(roleController)
)

router.get(
	'/trashed', 
	auth('role.trashed'),
	roleController.readAllTrash.bind(roleController)
)

router.get(
	'/:id', 
	[ auth('role.read'), checkIfValidId ],
	roleController.readOneById.bind(roleController)
)
	
router.patch(
	'/:id',
	[ auth('role.update'), checkIfValidId, roleValidation ],
	roleController.updateOne.bind(roleController)
)

router.patch(
	'/:id/trash', 
	[ auth('role.trash'), checkIfValidId ],
	roleController.trashOne.bind(roleController)
)

router.patch(
	'/:id/restore', 
	[ auth('role.restore'), checkIfValidId ],
	roleController.restoreOne.bind(roleController)
)

router.delete(
	'/:id', 
	[ auth('role.delete'), checkIfValidId],
	roleController.deleteOnePermanently.bind(roleController)
)

module.exports = router