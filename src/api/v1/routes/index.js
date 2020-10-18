const { getAllFiles } = require(__basedir + '/src/helpers/file.helper')

module.exports = function (app) {
	const FILE_EXTENSION = 'js'
	const files = getAllFiles(__dirname, FILE_EXTENSION)
	const removeExt = new RegExp(`\.${FILE_EXTENSION}$`, 'g')
	const removeRouteExt = new RegExp(`\.route\.${FILE_EXTENSION}$`, 'g')

	files.forEach(file => { 
		if(file === `index.${FILE_EXTENSION}`) return
		app.use(`/api/v1/${file.replace(removeRouteExt, '')}`, require(`./${file.replace(removeExt, '')}`))
	})
}