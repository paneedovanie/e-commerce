const CoreService = require( __srcdir + '/services/core.service' )
const service = new CoreService(require( __srcdir + '/models/User'))
const joi = require('@hapi/joi')
joi.objectId = require('joi-objectid')(joi);
const bcrypt = require('bcryptjs');
const { filterJoiErrors } = require( __srcdir + '/helpers/error.helper')
const { checkIfValidId, createUserValidation, updateUserValidation, loginUserValidation, usernameExists, emailExists, hashPassword } = require('../../../../helpers/validation.helper')

exports.loginValidation = async function (req, res, next) {
	const validInput = loginUserValidation(req.body)
	if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)})

	let user = await service.readOneByQuery({username: req.body.username})
	if(!user) return res.status(400).json({errors: ["username doesn't exists"]})
	
	if (user.deletedAt !== null) return res.status(400).json({errors: ["your account is disabled"]})
	if(!bcrypt.compareSync(req.body.password, user.password)) return res.status(400).json({errors: ["password didn't match"]})
	req._id = user._id

	next()
}

exports.createValidation = async function (req, res, next) {
	let errors = []

	const isInputValid = createUserValidation(req.body)
	if(isInputValid.error) return res.status(400).json({errors: filterJoiErrors(isInputValid.error.details)})

	const isUsernameValid = await usernameExists(req.body.username)
	if(isUsernameValid) errors.push("username already exists")

	const isEmailValid = await emailExists(req.body.email)
	if(isEmailValid) errors.push("email already exists")

	req.body.password = hashPassword(req.body.password)

	next()
}

exports.updateValidation = async function (req, res, next) {
	let errors = []

	const validInput = updateUserValidation(req.body)
	if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)});

	const isUsernameValid = await usernameExists(req.body.username, req.params.id)
	if(isUsernameValid) errors.push("username already exists")
	
	const isEmailValid = await emailExists(req.body.email, req.params.id)
	if(isEmailValid) errors.push("email already exists")

	if(errors.length) return res.status(400).json({errors})

	next()
}

exports.checkIfValidId = async function (req, res, next) {
	const validInput = checkIfValidId({ id: req.params.id });
	if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)});

	let result = await service.readOneById(req.params.id)
	if(!result) return res.status(400).json({errors: ["user doesn't exists"]})

	next()
}