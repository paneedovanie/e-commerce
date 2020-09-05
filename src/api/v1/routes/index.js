const userRoute = require('./user.route')

module.exports = function (app) {
    app.use('/api/v1/users', userRoute)
}