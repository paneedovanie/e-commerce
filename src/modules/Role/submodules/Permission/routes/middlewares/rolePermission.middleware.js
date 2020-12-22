const controller = require('../../controllers/rolePermission.controller')
const joi = require('@hapi/joi')
joi.objectId = require('joi-objectid')(joi);
const { filterJoiErrors } = require( __srcdir + 'helpers/error.helper')

exports.validation = async function (req, res, next) {
  const joiSchema = joi.object({
    role: joi.objectId().required(),
    permission: joi.objectId().required()
  }).options({abortEarly: false});

	const validInput = joiSchema.validate(req.body)
	if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)})

	next()
}

exports.checkIfValidId = async function (req, res, next) {
	const joiSchema = joi.object({
		id: joi.objectId().required()
	});

	const validInput = joiSchema.validate({ id: req.params.id });
	if(validInput.error) return res.status(400).json({errors: ['Wrong ID format']});

	let result = await controller.readOneById(req.params.id)
	if(!result) return res.status(400).json({errors: ["role's permission doesn't exists"]})

	next()
}