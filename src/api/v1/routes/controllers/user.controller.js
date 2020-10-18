const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = class UserController extends ApiController  { 
  constructor (props) {
		super(props)
	}

	async login (req, res) {
    try {
			const user = await this.service.readOneById(req._id)
			if(!bcrypt.compareSync(req.body.password, user.password)) return res.status(400).json({errors: ["password didn't match"]})
			
			const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

			res.status(200).json({'token': token, 'user': user})
    } catch (e) { res.status(500).send(e.message) }
	}

	async register (req, res) {
    try {
			req.body.password = hashPassword(req.body.password)

			let user = await crud.create(req.body)
			user = user._doc

			const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
		
			res.status(201).json({'token': token, 'user': user})
    } catch (e) { res.status(500).send(e.message) }
	}
}