const User = require('../../../../models/User')
const joi = require('@hapi/joi')
const bcrypt = require('bcryptjs');
joi.objectId = require('joi-objectid')(joi);
const { filterJoiErrors } = require('../../../../helpers/error.helper')

function createUserValidation (req, res, next) {
    const joiSchema = joi.object({
        firstName: joi.string().required().max(255),
        lastName: joi.string().required().max(255),
        username: joi.string().required().min(6).max(255),
        email: joi.string().required().email().max(255),
        password: joi.string().required().min(6).max(255),
        role: joi.objectId().required()
    }).options({abortEarly: false});

    const validInput = joiSchema.validate(req.body);
    if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)});

    next()
}

function updateUserValidation (req, res, next) {
    const joiSchema = joi.object({
        firstName: joi.string().required().max(255),
        lastName: joi.string().required().max(255),
        username: joi.string().required().min(6).max(255),
        email: joi.string().required().email().max(255),
        role: joi.objectId().required()
    }).options({abortEarly: false});

    const validInput = joiSchema.validate(req.body);
    if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)});

    next()
}

async function loginUserValidation (req, res, next) {
    const joiSchema = joi.object({
        username: joi.string().required().min(6).max(255),
        password: joi.string().required().min(6).max(255),
    }).options({abortEarly: false});

    const validInput = joiSchema.validate(req.body);
    if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)})

    const user = await User.findOne({username: req.body.username})
    if(!user) return res.status(400).json({errors: ["username doesn't exists"]})

    req.params.id = user._id
    
    if(!bcrypt.compareSync(req.body.password, user.password))
        return res.status(400).json({errors: ["password didn't match"]})
        
    next()
}

async function usernameExists (req, res, next) {
    const usernameExists = await User.findOne({username: req.body.username})
    if(!usernameExists) return res.status(400).json({errors: ["username doesn't exists"]})

    next()
}

async function usernameNotExists (req, res, next) {
    const usernameExists = await User.findOne({username: req.body.username})
    if(usernameExists) return res.status(400).json({errors: ["username already exists"]})

    next()
}

async function emailNotExists (req, res, next) {
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).json({errors: ["email already exists"]})

    next()
}

async function hashPassword (req, res, next) {
    var salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)

    next()
}

module.exports = {
    createUserValidation,
    updateUserValidation,
    loginUserValidation,
    usernameExists,
    usernameNotExists,
    emailNotExists,
    hashPassword
}