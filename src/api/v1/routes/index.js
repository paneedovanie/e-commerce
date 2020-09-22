const userRoute = require('./user.route')
const roleRoute = require('./role.route')
const rolePermissionRoute = require('./rolePermission.route')
const emotionRoute = require('./emotion.route')
const router = require('express').Router()


// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = function (app) {
    app.use('/api/v1/users', userRoute)
    app.use('/api/v1/roles', roleRoute)
    app.use('/api/v1/role_permissions', rolePermissionRoute)
    app.use('/api/v1/emotions', emotionRoute)
}