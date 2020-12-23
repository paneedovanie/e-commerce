const ApiController = require(__srcdir + 'core/controllers/api/api.controller')
const userController = require(`../../user.controller`)
const jwt = require('jsonwebtoken');

class ApiUserController extends ApiController {
	constructor (service) {
		super(service)
	}

	async login (req, res) {
    try {
			const user = await this.service.readOneById(req._id)
			const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

			res.status(200).json({'token': token, 'user': user})
    } catch (err) { res.status(500).send(err.message) }
	}

	async register (req, res) {
    try {
			let user = await crud.create(req.body)
			user = user._doc

			const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
		
			res.status(201).json({'token': token, 'user': user})
    } catch (err) { res.status(500).send(err.message) }
	}
}

module.exports = new ApiUserController(userController)