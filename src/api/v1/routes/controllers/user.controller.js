const User = require('../../../../models/User')
const Crud = require('../../../../services/crud.service')
const showFields = ['_id', 'firstName', 'lastName', 'email', 'role', 'username', 'verified', 'createdAt', 'updatedAt', 'deletedAt']
const crud = new Crud(User, showFields)
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { filterJoiErrors } = require('../../../../helpers/error.helper')
const { checkIfValidId, createUserValidation, updateUserValidation, loginUserValidation, usernameExists, emailExists, hashPassword } = require('../../../../helpers/validation.helper')

exports.readAll = async function (req, res) {
    try {
        const result = await crud.read({ ...req.query, deletedAt: '' })
        res.status(200).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.readAllTrash = async function (req, res) {
    try {
        const result = await crud.read({ ...req.query, deletedAt: {$ne: '' }})
        res.status(200).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.readOne = async function (req, res) {
    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})
        
        const result = await crud.readSingle(req.params.id)
        res.status(200).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.createOne = async function (req, res) {
    let errors = [];

    try {
        const isInputValid = createUserValidation(req.body)
        if(isInputValid.error) return res.status(400).json({errors: filterJoiErrors(isInputValid.error.details)})

        const isUsernameValid = await usernameExists(req.body.username)
        if(isUsernameValid) errors.push("username already exists")

        const isEmailValid = await emailExists(req.body.email)
        if(isEmailValid) errors.push("email already exists")

        if(errors.length) return res.status(400).json({errors})

        req.body.password = hashPassword(req.body.password)

        let user = await crud.create(req.body)
        user = user._doc
        delete user.password

        res.status(201).json(user)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.updateOne = async function (req, res) {
    let errors = []

    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})

        const validInput = updateUserValidation(req.body)
        if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)});

        const isUsernameValid = await usernameExists(req.body.username, req.params.id)
        if(isUsernameValid) errors.push("username already exists")
        
        const isEmailValid = await emailExists(req.body.email, req.params.id)
        if(isEmailValid) errors.push("email already exists")

        if(errors.length) return res.status(400).json({errors})

        let user = await crud.update(req.params.id, req.body)
        user = user._doc
        delete user.password

        res.status(202).json(user)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.trashOne = async function (req, res) {
    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})
        
        let user = await crud.trash(req.params.id)
        user = user._doc
        delete user.password

        res.status(202).json(user)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.restoreOne = async function (req, res) {
    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})
        
        let user = await crud.restore(req.params.id)
        user = user._doc
        delete user.password
        
        res.status(202).json(user)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.deleteOnePermanently = async function (req, res) {
    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})
        
        let user = await crud.deletePermanently(req.params.id)
        user = user._doc
        delete user.password
        
        res.status(204).json(user)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.register = async function (req, res) {
    let errors = [];

    try {
        const isInputValid = createUserValidation(req.body)
        if(isInputValid.error) return res.status(400).json({errors: filterJoiErrors(isInputValid.error.details)})

        const isUsernameValid = await usernameExists(req.body.username)
        if(isUsernameValid) errors.push("username already exists")
        
        const isEmailValid = await emailExists(req.body.email)
        if(isEmailValid) errors.push("email already exists")

        if(errors.length) return res.status(400).json({errors})

        req.body.password = hashPassword(req.body.password)

        let user = await crud.create(req.body)
        user = user._doc
		const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
		delete user.password
		
        res.status(201).json({'token': token, 'user': user})
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.login = async function (req, res) {
    const validInput = loginUserValidation(req.body)
    if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)})

    let user = await crud.readSingleByQuery({username: req.body.username})
    if(!user) return res.status(400).json({errors: ["username doesn't exists"]})
    
    try {
        let time = await user.deletedAt.getTime()
        return res.status(400).json({errors: ["your account is disabled"]})
    } catch (e) {
        //
    }
    
    if(!bcrypt.compareSync(req.body.password, user.password))
        return res.status(400).json({errors: ["password didn't match"]})

    try {
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        user = user._doc
		delete user.password
		
        res.status(200).json({'token': token, 'user': user})
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.changePassword = async function (req, res) {
    let errors = []

    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})

        const validInput = changePasswordUserValidation(req.body)
        if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)});

        if(errors.length) return res.status(400).json({errors})

        let user = await crud.update(req.params.id, req.body)
        user = user._doc
        delete user.password

        res.status(202).json(user)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}