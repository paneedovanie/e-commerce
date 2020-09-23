const Emotion = require('../../../../models/Emotion')
const Crud = require('../../../../services/crud.service')
const crud = new Crud(Emotion)
const { filterJoiErrors } = require('../../../../helpers/error.helper')
const { encode, strToArray } = require('../../../../helpers/string.helper')
const { checkIfValidId, emotionValidation, phraseExists, moodValidation } = require('../../../../helpers/validation.helper')
const emotions = require('../../../../cli/assets/emotions')

exports.readMood = async function (req, res) {
    const isInputValid = moodValidation(req.body)
    if(isInputValid.error) return res.status(400).json({errors: filterJoiErrors(isInputValid.error.details)})

    const thought = req.body.phrase.toLowerCase() 
    const thoughtArray = strToArray(thought)
    try {
        // let emotions = await crud.read({"$nor":[{"phrase": new RegExp(thoughtArray.join("|"))}]})
        let emotions = []

        for(let i = thoughtArray.length - 1; i >= 0; i--) {
            let stringsQuery = []
            for(let j = 0; j <= i; j++)
                stringsQuery.push({ phrase: new RegExp(thoughtArray[j]) })
            emotions = await Emotion.aggregate([
                {
                    $match: {
                        $and: stringsQuery
                    }
                },
                {
                    $group :
                    {
                        _id : "$category",
                        total: { $sum: 1 },
                    }
                },
            ])

            if(emotions.length !== 0)
                break
        }

        let mood = 'none'
        let currentHighestTotal = 0;
        for(const emotion of emotions) {
            if(currentHighestTotal < emotion.total)
                mood = emotion._id
        }

        res.status(200).json(mood)
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

        req.body.phrase = req.body.phrase.toLowerCase()
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

        req.body.phrase = req.body.phrase.toLowerCase()
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