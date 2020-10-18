const RolePermission = require(__srcdir + '/models/RolePermission')
const Crud = require(__srcdir + '/services/crud.service')
const crud = new Crud(RolePermission)
const { filterJoiErrors } = require(__srcdir + '/helpers/error.helper')
const { checkIfValidId, rolePermissionValidation, rolePermissionExists } = require(__srcdir + '/helpers/validation.helper')

exports.readAll = async function (req, res) {
    try {
        const result = await crud.read({ ...req.query, deletedAt: '' })
        res.status(200).json(result)
    } catch (e) { res.status(500).send(e.message) }
}

exports.readAllTrash = async function (req, res) {
    try {
        const result = await crud.read({ ...req.query, deletedAt: {$ne: '' }})
        res.status(200).json(result)
    } catch (e) { res.status(500).send(e.message) }
}

exports.readOne = async function (req, res) {
    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})
        
        const result = await crud.readOneById(req.params.id)
        res.status(200).json(result)
    } catch (e) { res.status(500).send(e.message) }
}

exports.createOne = async function (req, res) {
    let errors = [];

    try {
        const isInputValid = rolePermissionValidation(req.body)
        if(isInputValid.error) return res.status(400).json({errors: filterJoiErrors(isInputValid.error.details)})

        const isRolePermissionValid = await rolePermissionExists(RolePermission, req.body)
        if(isRolePermissionValid) errors.push("permission already exists")

        if(errors.length) return res.status(400).json({errors})

        let role = await crud.create(req.body)

        res.status(201).json(role)
    } catch (e) { res.status(500).send(e.message) }
}

exports.updateOne = async function (req, res) {
    let errors = []

    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})

        const validInput = rolePermissionValidation(req.body)
        if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)});

        const isRolePermissionValid = await rolePermissionExists(RolePermission, req.body, req.params.id)
        if(isRolePermissionValid) errors.push("permission already exists")

        if(errors.length) return res.status(400).json({errors})

        let result = await crud.update(req.params.id, req.body)

        res.status(202).json(result)
    } catch (e) { res.status(500).send(e.message) }
}

exports.trashOne = async function (req, res) {
    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})
        
        let result = await crud.trash(req.params.id)

        res.status(202).json(result)
    } catch (e) { res.status(500).send(e.message) }
}

exports.restoreOne = async function (req, res) {
    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})
        
        let result = await crud.restore(req.params.id)
        
        res.status(202).json(result)
    } catch (e) { res.status(500).send(e.message) }
}

exports.deleteOnePermanently = async function (req, res) {
    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})
        
        let result = await crud.deletePermanently(req.params.id)
        
        res.status(204).json(result)
    } catch (e) { res.status(500).send(e.message) }
}