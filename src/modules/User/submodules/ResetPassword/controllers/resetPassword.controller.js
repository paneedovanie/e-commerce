const Crud = require(__srcdir + 'core/controllers/core.controller')
const ResetPassword = require(`${ __srcdir }/modules/User/models/ResetPassword`)

module.exports = new Crud(ResetPassword)