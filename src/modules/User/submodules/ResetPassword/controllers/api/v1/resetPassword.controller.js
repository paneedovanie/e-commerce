const ApiController = require(__srcdir + 'core/controllers/api/api.controller')
const ResetPassword = require(`${ __srcdir }/modules/User/models/ResetPassword`)
const jwt = require('jsonwebtoken');

class ResetPasswordController extends ApiController {
	constructor (props) {
		super(props)
	}

	async login (req, res) {
    try {
			const user = await this.service.readOneById(req._id)
			const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

			res.status(200).json({'token': token, 'user': user})
    } catch (e) { res.status(500).send(e.message) }
	}

	async register (req, res) {
    try {
			let user = await crud.create(req.body)
			user = user._doc

			const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
		
			res.status(201).json({'token': token, 'user': user})
    } catch (e) { res.status(500).send(e.message) }
	}
}

module.exports = new ResetPasswordController(ResetPassword)