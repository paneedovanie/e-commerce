const joi = require('@hapi/joi')
joi.objectId = require('joi-objectid')(joi);
const { filterJoiErrors } = require('../../../../helpers/error.helper')

function checkIfValidId (req, res, next) {
    const joiSchema = joi.object({
        id: joi.objectId().required()
    }).options({abortEarly: false});

    const validInput = joiSchema.validate(req.params);
    if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)});

    next()
}

module.exports = {
    checkIfValidId
}