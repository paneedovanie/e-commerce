const ApiController = require( `${ __srcdir }core/controllers/api/api.controller` )
const Category = require( `${ __srcdir }modules/Category/models/Category` )

class CategoryController extends ApiController {
	constructor (props) {
		super(props)
	}
}

module.exports = new CategoryController(Category)