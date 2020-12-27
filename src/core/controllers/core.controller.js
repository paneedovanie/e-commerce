const CrudService = require('../services/crud.service')

module.exports = class extends CrudService {
	constructor (model, showFields, populate) {
		super(model, showFields, populate)
	}
}