const Emotion = require('../../../../models/Emotion')
const Crud = require('../../../../services/crud.service')
const crud = new Crud(Emotion)
const { filterJoiErrors } = require('../../../../helpers/error.helper')
const { encode } = require('../../../../helpers/string.helper')
const { checkIfValidId, emotionValidation, phraseExists, moodValidation } = require('../../../../helpers/validation.helper')
const brain = require('brain.js')
const network = new brain.NeuralNetwork()

exports.readMood = async function (req, res) {
    const isInputValid = moodValidation(req.body)
    if(isInputValid.error) return res.status(400).json({errors: filterJoiErrors(isInputValid.error.details)})

    const thought = req.body.phrase 
    let maxLength = thought.length
    try {
        const emotions = await crud.read({ deletedAt: '' })
        emotions.forEach(e => {
            if(maxLength < e.phrase.length)
                maxLength = e.phrase.length
        })
        
        let trainingData = []

        emotions.forEach(e => {
            trainingData.push({ input: encode(e.phrase, maxLength), output: {[e.category]: 1} })
        })

        network.train(trainingData)
        const result = brain.likely(encode(thought, maxLength), network)

        // const result = network.run(encode(thought, maxLength))
        // result.happy = result.happy.toFixed(3)
        // result.sad = result.sad.toFixed(3)
        // result.disgust = result.disgust.toFixed(3)
        // result.angry = result.angry.toFixed(3)
        // result.fear = result.fear.toFixed(3)

        res.status(200).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

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
        const isInputValid = emotionValidation(req.body)
        if(isInputValid.error) return res.status(400).json({errors: filterJoiErrors(isInputValid.error.details)})

        // const isNameValid = await phraseExists(Emotion, req.body.phrase)
        // if(isNameValid) errors.push("phrase already exists")

        if(errors.length) return res.status(400).json({errors})

        let role = await crud.create(req.body)

        res.status(201).json(role)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.updateOne = async function (req, res) {
    let errors = []

    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})

        const validInput = emotionValidation(req.body)
        if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)});

        const isNameValid = await phraseExists(Emotion, req.body.phrase, req.params.id)
        if(isNameValid) errors.push("phrase already exists")

        if(errors.length) return res.status(400).json({errors})

        let result = await crud.update(req.params.id, req.body)

        res.status(202).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.trashOne = async function (req, res) {
    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})
        
        let result = await crud.trash(req.params.id)

        res.status(202).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.restoreOne = async function (req, res) {
    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})
        
        let result = await crud.restore(req.params.id)
        
        res.status(202).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.deleteOnePermanently = async function (req, res) {
    try {
        if(!checkIfValidId(req.params.id)) return res.status(400).json({errors: ['id doesn\'t exists']})
        
        let result = await crud.deletePermanently(req.params.id)
        
        res.status(204).json(result)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}