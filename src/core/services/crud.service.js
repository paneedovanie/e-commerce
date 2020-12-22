const CoreService = require('./ext/core.service')

module.exports = class CrudService extends CoreService {
	constructor (name, controller) {
		super(name, controller)
	}

	read (query) {
		try {
			return this.model.find(query, this.showFields);
		} catch (err) { throw new Error(e.message) }
	}
	
	readOneById (id) {
		try {
			return this.model.findById(id, this.showFields);
		} catch (err) { throw new Error(e.message) }
	}
	
	readOneByQuery (query) {
		try {
			return this.model.findOne(query, this.showFields);
		} catch (err) { throw new Error(e.message) }
	}
	
	create (query) {
		try {
			const createThis = new this.model(query);
			return createThis.save();
		} catch (err) { throw new Error(e.message) }
	}
	
	update (id, query) {
		try {
			return this.model.findByIdAndUpdate(id, {$set: query});
		} catch (err) { throw new Error(e.message) }
	}
	
	trash (id) {
		try {
			return this.model.findByIdAndUpdate(id, {$set: { deletedAt: new Date()}});
		} catch (err) { throw new Error(e.message) }
	}
	
	restore (id) {
		try {
			return this.model.findByIdAndUpdate(id, {$set: { deletedAt: ''}});
		} catch (err) { throw new Error(e.message) }
	}
	
	deletePermanently (id) {
		try {
			return this.model.findByIdAndDelete(id);
		} catch (err) { throw new Error(e.message) }
	}
} 