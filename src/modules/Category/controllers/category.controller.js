const Crud = require(__srcdir + 'core/controllers/core.controller')
const Category = require('../models/Category')

module.exports = new Crud(Category)