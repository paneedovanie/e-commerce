const Crud = require(__srcdir + 'core/controllers/core.controller')
const User = require('../models/User')

class UserController extends Crud {
  constructor(model, showFields, populate) {
    super(model, showFields, populate)
  }
}

module.exports = new UserController(User, null, 'role')