const Role = require('../models/Role')

//READ ALL
exports.read = function (body) {
    try {
        return Role.find(body);
    } catch (e) {
        throw new Error(e.message)
    }
}

//READ ONE
exports.readSingle = function (id) {
    try {
        return Role.findById(id);
    } catch (e) {
        throw new Error(e.message)
    }
}

//READ ONE BY QUERY
exports.readSingleByQuery = function (body) {
    try {
        return Role.findOne(body);
    } catch (e) {
        throw new Error(e.message)
    }
}

//CREATE ONE
exports.create = function (body) {
    try {
        const createThis = new Role(body);
        return createThis.save();
    } catch (e) {
        throw new Error(e.message)
    }
}

//UPDATE ONE
exports.update = function (id, body) {
    try {
        return Role.findByIdAndUpdate(id, {$set: body});
    } catch(e){
        throw new Error(e.message)
    }
}

//TRASH ONE
exports.trash = function (id) {
    try{
        return Role.findByIdAndUpdate(id, {$set: { deletedAt: new Date()}});
    }catch(e){
        throw new Error(e.message)
    }
}

//RESTORE ONE
exports.restore = function (id) {
    try{
        return Role.findByIdAndUpdate(id, {$set: { deletedAt: ''}});
    }catch(err){
        throw new Error(e.message)
    }
}

//DELETE ONE
exports.deletePermanently = function (id) {
    try{
        return Role.findByIdAndDelete(id);
    }catch(err){
        throw new Error(e.message)
    }
}