module.exports = class CoreService {
	constructor (model, showFields = []) {
		this.model = model
		this.showFields = showFields
	}

	read (filter) {
		try {
			return this.model.find(filter, this.showFields);
		} catch (err) { throw new Error(e.message) }
	}
	
	readOneById (id) {
		try {
			return this.model.findById(id, this.showFields);
		} catch (err) { throw new Error(e.message) }
	}
	
	readOneByQuery (filter) {
		try {
			return this.model.findOne(filter, this.showFields);
		} catch (err) { throw new Error(e.message) }
	}
	
	create (filter) {
		try {
			const createThis = new this.model(filter);
			return createThis.save();
		} catch (err) { throw new Error(e.message) }
	}
	
	update (id, filter) {
		try {
			return this.model.findByIdAndUpdate(id, {$set: filter});
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