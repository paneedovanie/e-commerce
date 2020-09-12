const User = require('../models/User')

const showFields = ['_id', 'firstName', 'lastName', 'email', 'role', 'username', 'verified', 'createdAt', 'updatedAt', 'deletedAt']

//READ ALL
exports.read = function (body) {
    try {
        return User.find(body, showFields);
    } catch (e) {
        throw new Error(e.message)
    }
}

//READ ONE
exports.readSingle = function (id) {
    try {
        return User.findById(id, showFields);
    } catch (e) {
        throw new Error(e.message)
    }
}

//READ ONE BY QUERY
exports.readSingleByQuery = function (body) {
    try {
        return User.findOne(body);
    } catch (e) {
        throw new Error(e.message)
    }
}

//CREATE ONE
exports.create = function (body) {
    try {
        const createThis = new User(body);
        return createThis.save();
    } catch (e) {
        throw new Error(e.message)
    }
}

//UPDATE ONE
exports.update = function (id, body) {
    try {
        return User.findByIdAndUpdate(id, {$set: body});
    } catch(e){
        throw new Error(e.message)
    }
}

//TRASH ONE
exports.trash = function (id) {
    try{
        return User.findByIdAndUpdate(id, {$set: { deletedAt: new Date()}});
    }catch(e){
        throw new Error(e.message)
    }
}

//RESTORE ONE
exports.restore = function (id) {
    try{
        return User.findByIdAndUpdate(id, {$set: { deletedAt: ''}});
    }catch(err){
        throw new Error(e.message)
    }
}

//DELETE ONE
exports.deletePermanently = function (id) {
    try{
        return User.findByIdAndDelete(id);
    }catch(err){
        throw new Error(e.message)
    }
}