const User = require('../models/User')
const joi = require('@hapi/joi')
const bcrypt = require('bcryptjs');
joi.objectId = require('joi-objectid')(joi);

exports.checkIfValidId = function (id) {
    const joiSchema = joi.object({
        id: joi.objectId().required()
    }).options({abortEarly: false});

    return joiSchema.validate(id);
}

exports.createUserValidation = function (input) {
    const joiSchema = joi.object({
        firstName: joi.string().required().max(255),
        lastName: joi.string().required().max(255),
        username: joi.string().required().min(6).max(255),
        email: joi.string().required().email().max(255),
        password: joi.string().required().min(6).max(255),
        role: joi.objectId().required()
    }).options({abortEarly: false});

    return joiSchema.validate(input);
}

exports.updateUserValidation = function (input) {
    const joiSchema = joi.object({
        firstName: joi.string().required().max(255),
        lastName: joi.string().required().max(255),
        username: joi.string().required().min(6).max(255),
        email: joi.string().required().email().max(255),
        role: joi.objectId().required()
    }).options({abortEarly: false});

    return joiSchema.validate(input);
}

exports.changePasswordUserValidation = function (input) {
    const joiSchema = joi.object({
        currentPassword: joi.string().required(),
        newPassword: joi.string().required().min(6).max(255),
    }).options({abortEarly: false});

    return joiSchema.validate(input);
}

exports.loginUserValidation = function (body) {
    const joiSchema = joi.object({
        username: joi.string().required().max(255),
        password: joi.string().required().max(255),
    }).options({abortEarly: false});

    return joiSchema.validate(body);
}

exports.usernameExists = async function (input, id) {
    const usernameExists = await User.findOne({
        $and:[
            { username: input },
            { _id: { $ne: id } }
        ]})
    return usernameExists ? true : false
}

exports.emailExists = async function (input, id) {
    const emailExists = await User.findOne({
        $and:[
            { email: input },
            { _id: { $ne: id } }
        ]})
    return emailExists ? true : false
}

exports.hashPassword = function (input) {
    var salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(input, salt)
}

exports.nameExists = async function (model, name, id) {
    const result = await model.findOne({
        $and:[
            { name: name },
            { _id: { $ne: id } }
        ]
    })
    return result ? true : false
}

exports.roleValidation = function (input) {
    const joiSchema = joi.object({
        name: joi.string().required().max(255),
    }).options({abortEarly: false});

    return joiSchema.validate(input);
}

exports.rolePermissionValidation = function (input) {
    const joiSchema = joi.object({
        role: joi.objectId().required(),
        permission: joi.objectId().required()
    }).options({abortEarly: false});

    return joiSchema.validate(input);
}

exports.categoryValidation = function (input) {
    const joiSchema = joi.object({
        name: joi.string().required().max(255),
        type: joi.string().required().max(255),
    }).options({abortEarly: false});

    return joiSchema.validate(input);
}

exports.rolePermissionExists = async function (model, input, id) {
    const result = await model.findOne({
        $and:[
            { role: input.role },
            { permission: input.permission },
            { _id: {$ne: id} },
        ]
    })
    return result ? true : false
}