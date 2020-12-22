const controller = require('../../controllers/user.controller')
const joi = require('@hapi/joi')
joi.objectId = require('joi-objectid')(joi);
const bcrypt = require('bcryptjs');
const { filterJoiErrors } = require( `${__srcdir }/helpers/error.helper` )
const { hashPassword } = require( `${__srcdir }/helpers/string.helper` )

exports.loginValidation = async function (req, res, next) {
	let errors = []

	const joiSchema = joi.object({
		username: joi.string().required().max(255),
		password: joi.string().required().max(255),
	}).options({abortEarly: false});
	
	const validInput = joiSchema.validate(req.body);
	if(validInput.error) errors = filterJoiErrors(validInput.error.details)

	let user = await controller.readOneByQuery({ username: req.body.username })
	if(errors.length === 0 && !user) errors.push("username doesn't exists")
	
	if(errors.length === 0 && user.deletedAt !== null) errors.push("your account is disabled")
	
	if(errors.length === 0 && !bcrypt.compareSync(req.body.password, user.password)) errors.push("password didn't match")

	req._id = user._id

	if(errors.length > 0) res.status(400).json({ errors })
	next()
}

exports.createValidation = async function (req, res, next) {
	let errors = []

	const joiSchema = joi.object({
		firstName: joi.string().required().max(255),
		lastName: joi.string().required().max(255),
		username: joi.string().required().min(6).max(255),
		email: joi.string().required().email().max(255),
		password: joi.string().required().min(6).max(255),
		role: joi.objectId().required()
	}).options({abortEarly: false});

	const isInputValid =  joiSchema.validate(req.body);
	if(isInputValid.error) errors =  filterJoiErrors(isInputValid.error.details)

	if(errors.length === 0) {
		const isUsernameExists = await controller.isExists(null, 'username', req.body.username)
		if(isUsernameExists) errors.push("username already exists")
	
		const isEmailExists = await controller.isExists(null, 'email', req.body.email)
		if(isEmailExists) errors.push("email already exists")
	
		req.body.password = hashPassword(req.body.password)
	}
	
	if(errors.length > 0) res.status(400).json({ errors })
	next()
}

exports.updateValidation = async function (req, res, next) {
	let errors = []

	const joiSchema = joi.object({
		firstName: joi.string().required().max(255),
		lastName: joi.string().required().max(255),
		username: joi.string().required().min(6).max(255),
		email: joi.string().required().email().max(255),
		role: joi.objectId().required()
	}).options({abortEarly: false});

	const validInput = joiSchema.validate(req.body)
	if(validInput.error) errors = filterJoiErrors(validInput.error.details)

	const isUsernameExists = await controller.isExists(req.params.id, 'username', req.body.username)
	if(errors.length === 0 && isUsernameExists) errors.push("username already exists")
	
	const isEmailExists = await controller.isExists(req.params.id, 'email', req.body.email)
	if(errors.length === 0 && isEmailExists) errors.push("email already exists")

	if(errors.length > 1) return res.status(400).json({errors})

	next()
}

exports.checkIfValidId = async function (req, res, next) {
	const joiSchema = joi.object({
		id: joi.objectId().required()
	});

	const validInput = joiSchema.validate({ id: req.params.id });
	if(validInput.error) return res.status(400).json({errors: ['Wrong ID format']});

	let result = await controller.readOneById(req.params.id)
	if(!result) return res.status(400).json({errors: ["user doesn't exists"]})

	next()
}