const CoreService = require( __srcdir + '/services/core.service' )
const service = new CoreService(require( __srcdir + '/models/RolePermission'))
const joi = require('@hapi/joi')
joi.objectId = require('joi-objectid')(joi);
const { filterJoiErrors } = require( __srcdir + '/helpers/error.helper')
const { checkIfValidId, rolePermissionValidation } = require('../../../../helpers/validation.helper')

exports.rolePermissionValidation = async function (req, res, next) {
	const validInput = rolePermissionValidation(req.body)
	if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)})

	let result = await model.findOne({
        $and:[
            { role: req.body.role },
            { permission: req.body.permission },
            { _id: {$ne: req.params.id} },
        ]
    })
	if(result) return res.status(400).json({errors: ["permission exists"]})

	next()
}

exports.checkIfValidId = async function (req, res, next) {
	const validInput = checkIfValidId({ id: req.params.id });
	if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)});

	let result = await service.readOneById(req.params.id)
	if(!result) return res.status(400).json({errors: ["role permission doesn't exists"]})

	next()
}