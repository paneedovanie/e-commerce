const { read, readSingle, create, update, trash, restore, deletePermanently } = require('../../../../services/user.service')
const jwt = require('jsonwebtoken');

async function readAll (req, res) {
    try {
        const result = await read({deletedAt: ''})
        res.status(201).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

async function readAllTrash (req, res) {
    try {
        const result = await read({deletedAt: {$ne: ''}})
        res.status(201).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

async function readOne (req, res) {
    try {
        const result = await readSingle(req.params.id)
        res.status(201).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

async function createOne (req, res) {
    try {
        const result = await create(req.body)
        res.status(201).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

async function updateOne (req, res) {
    try {
        const result = await update(req.params.id, req.body)
        res.status(202).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

async function trashOne (req, res) {
    try {
        const result = await trash(req.params.id)
        res.status(202).json(result)
    }
    catch (e) {
        console.log(req.params)
        res.status(500).send(e.message)
    }
}

async function restoreOne (req, res) {
    try {
        const result = await restore(req.params.id)
        res.status(202).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

async function deleteOnePermanently (req, res) {
    try {
        const result = await deletePermanently(req.params.id)
        res.status(202).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

async function register (req, res) {
    try {
		let user = await create(req.body)
		const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
		delete user.password
		
        res.status(201).json({'token': token, 'user': user})
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

async function login (req, res) {
    try {
		let user = await readSingle(req.params.id)
		const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
		delete user.password
		
        res.status(200).json({'token': token, 'user': user})
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = {
    readAll,
	readAllTrash,
	readOne,
    createOne,
    updateOne,
    trashOne,
    restoreOne,
	deleteOnePermanently,
	register,
	login
}