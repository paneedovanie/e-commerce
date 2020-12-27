const controller = require('../../controllers/product.controller')
  const joi = require('@hapi/joi')
  joi.objectId = require('joi-objectid')(joi);
  const { filterJoiErrors } = require( __srcdir + 'helpers/error.helper')
  
  exports.validation = async function (req, res, next) {
    const joiSchema = joi.object({
      name: joi.string().required().max(255),
    });
  
    const validInput = joiSchema.validate(req.body)
    if(validInput.error) return res.status(400).json({errors: filterJoiErrors(validInput.error.details)})
  
    let result = await controller.isExists(req.params.id, 'name', req.body.name)
    if(result) return res.status(400).json({errors: ["name exists"]})
  
    next()
  }
  
  exports.checkIfValidId = async function (req, res, next) {
    const joiSchema = joi.object({
      id: joi.objectId().required()
    });
  
    const validInput = joiSchema.validate({ id: req.params.id });
    if(validInput.error) return res.status(400).json({errors: ['Wrong ID format']});
  
    let result = await controller.readOneById(req.params.id)
    if(!result) return res.status(400).json({errors: ["product doesn't exists"]})
  
    next()
  }