const ApiController = require( `${ __srcdir }core/controllers/api/api.controller` )
const categoryController = require(`../../category.controller`)

class ApiCategoryController extends ApiController {
	constructor (props) {
		super(props)
	}
}

module.exports = new ApiCategoryController(categoryController)