const CoreService = require('./ext/core.service')

module.exports = class CrudService extends CoreService {
	constructor (model, showFields, populate) {
		super(model, showFields, populate)
	}

	read (query) {
		try {
			return this.model.find(query, this.showFields).populate(this.populate)
		} catch (err) { throw new Error(err.message) }
	}
	
	readOneById (id) {
		try {
			return this.model.findById(id, this.showFields).populate(this.populate)
		} catch (err) { throw new Error(err.message) }
	}
	
	readOneByQuery (query) {
		try {
			return this.model.findOne(query, this.showFields).populate(this.populate)
		} catch (err) { throw new Error(err.message) }
	}
	
	create (query) {
		try {
			const createThis = new this.model(query);
			return createThis.save();
		} catch (err) { throw new Error(err.message) }
	}
	
	update (id, query) {
		try {
			return this.model.findByIdAndUpdate(id, {$set: query});
		} catch (err) { throw new Error(err.message) }
	}
	
	trash (id) {
		try {
			return this.model.findByIdAndUpdate(id, {$set: { deletedAt: new Date()}});
		} catch (err) { throw new Error(err.message) }
	}
	
	restore (id) {
		try {
			return this.model.findByIdAndUpdate(id, {$set: { deletedAt: ''}});
		} catch (err) { throw new Error(err.message) }
	}
	
	deletePermanently (id) {
		try {
			return this.model.findByIdAndDelete(id);
		} catch (err) { throw new Error(err.message) }
	}
} 