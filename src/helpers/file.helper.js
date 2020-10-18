const fs = require('fs')

module.exports.getAllFiles = (dir = '/', ext = null) => {
	let files = []
	fs.readdirSync(dir).forEach(function(file) {
		const fileExt = new RegExp(`\.${ext}$`, "g")
		if (file.match(fileExt) === null) return
		files.push(file)
	});
	return files
}