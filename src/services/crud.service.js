module.exports = class Crud {
    constructor (model, showFields = []) {
        this.model = model
        this.showFields = showFields
    }

    read (body) {
        try {
            return this.model.find(body, this.showFields);
        } catch (e) {
            throw new Error(e.message)
        }
    }
    
    //READ ONE
    readSingle (id) {
        try {
            return this.model.findById(id, this.showFields);
        } catch (e) {
            throw new Error(e.message)
        }
    }
    
    //READ ONE BY QUERY
    readSingleByQuery (body) {
        try {
            return this.model.findOne(body);
        } catch (e) {
            throw new Error(e.message)
        }
    }
    
    //CREATE ONE
    create (body) {
        try {
            const createThis = new this.model(body);
            return createThis.save();
        } catch (e) {
            throw new Error(e.message)
        }
    }
    
    //UPDATE ONE
    update (id, body) {
        try {
            return this.model.findByIdAndUpdate(id, {$set: body});
        } catch(e){
            throw new Error(e.message)
        }
    }
    
    //TRASH ONE
    trash (id) {
        try{
            return this.model.findByIdAndUpdate(id, {$set: { deletedAt: new Date()}});
        }catch(e){
            throw new Error(e.message)
        }
    }
    
    //RESTORE ONE
    restore (id) {
        try{
            return this.model.findByIdAndUpdate(id, {$set: { deletedAt: ''}});
        }catch(err){
            throw new Error(e.message)
        }
    }
    
    //DELETE ONE
    deletePermanently (id) {
        try{
            return this.model.findByIdAndDelete(id);
        }catch(err){
            throw new Error(e.message)
        }
    }
} 