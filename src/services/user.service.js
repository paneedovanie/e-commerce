const User = require('../models/User')

const showFields = ['_id', 'firstName', 'lastName', 'email', 'role', 'username', 'verified', 'createdAt', 'updatedAt', 'deletedAt']

//READ ALL
function read (body) {
    try {
        return User.find(body, showFields);
    } catch (e) {
        throw new Error(e.message)
    }
}

//READ ONE
function readSingle (id) {
    try {
        return User.findById(id, showFields);
    } catch (e) {
        throw new Error(e.message)
    }
}

//READ ONE BY QUERY
function readSingleByQuery (body) {
    try {
        return User.findOne(body);
    } catch (e) {
        throw new Error(e.message)
    }
}

//CREATE ONE
function create (body) {
    try {
        const createThis = new User(body, showFields);
        return createThis.save();
    } catch (e) {
        throw new Error(e.message)
    }
}

//UPDATE ONE
function update (id, body) {
    try {
        return User.findByIdAndUpdate(id, {$set: body});
    } catch(e){
        throw new Error(e.message)
    }
}

//TRASH ONE
function trash (id) {
    try{
        return User.findByIdAndUpdate(id, {$set: { deletedAt: new Date()}});
    }catch(e){
        throw new Error(e.message)
    }
}

//RESTORE ONE
function restore (id) {
    try{
        return User.findByIdAndUpdate(id, {$set: { deletedAt: ''}});
    }catch(err){
        throw new Error(e.message)
    }
}

//DELETE ONE
function deletePermanently (id) {
    try{
        return User.findByIdAndDelete(id);
    }catch(err){
        throw new Error(e.message)
    }
}

module.exports = {
    read,
    readSingle,
    readSingleByQuery,
    create,
    update,
    trash,
    restore,
    deletePermanently,
}