const requireContext = require('node-require-context')

module.exports = function (app) {
  let files = requireContext("..", true, /(modules)\/\w+\/(routes)\/\w+\.js/)
  if(files.keys().length === 0)
  files = requireContext("..", true, /(modules)\\\w+\\(routes)\\\w+\.js/)
  files.keys().forEach(file => {
    const { routeName, routes } = files(file)
    app.use(routeName, routes)
  })
} 