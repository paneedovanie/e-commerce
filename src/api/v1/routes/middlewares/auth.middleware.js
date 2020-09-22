const User = require('../../../../models/User')
const Permission = require('../../../../models/Permission')
const RolePermission = require('../../../../models/RolePermission')
const showFields = ['_id', 'firstName', 'lastName', 'email', 'role', 'username', 'verified', 'createdAt', 'updatedAt', 'deletedAt']
const jwt = require('jsonwebtoken');

module.exports.auth = function (code = '') {
    return async (req, res, next) => {
        if(process.env.NODE_ENV === 'test') {
            next();
        } else {
            const token = req.header('auth-token');
            if(!jwt.JsonWebTokenError) return res.status(401).send('Access denied!');
        
            try{
                const validated = jwt.verify(token, process.env.TOKEN_SECRET);
                
                if(validated._id) {
                    req.user = await User.findById(validated._id, showFields);
                    let permission_id = await Permission.findOne({ code: code});
                    let hasPermission = await RolePermission.findOne({role: req.user.role, permission: permission_id});
                    if(!hasPermission) return res.status(403).send('No permission to access this!');
                    next();
                } 
                else return res.status(400).send('Invalid token');
            }catch(err){
                res.status(400).send('Invalid token' + err);
            }
        }
    }
}