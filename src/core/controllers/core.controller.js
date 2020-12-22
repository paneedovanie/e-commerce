const CrudService = require('../services/crud.service')

module.exports = class extends CrudService {
	constructor (name, controller) {
		super(name, controller)
	}
}