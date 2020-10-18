const CoreService = require( __srcdir + '/services/core.service' )
const service = new CoreService(require( __srcdir + '/models/Role'))
const joi = require('@hapi/joi')
joi.objectId = require('joi-objectid')(joi);
const { filterJoiErrors } = require( __srcdir + '/helpers/error.helper')
const { checkIfValidId, roleValidation, nameExists } = require('../../../../helpers/validation.helper')

exports.roleValidation = async function (req, res, next) {
	const validInput = roleValidation(req.body)
	if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)})

	let result = await service.readOneByQuery({ name: req.body.name })
	if(result) return res.status(400).json({errors: ["name exists"]})

	next()
}

exports.checkIfValidId = async function (req, res, next) {
	const validInput = checkIfValidId({ id: req.params.id });
	if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)});

	let result = await service.readOneById(req.params.id)
	if(!result) return res.status(400).json({errors: ["role doesn't exists"]})

	next()
}