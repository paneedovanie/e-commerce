const requireContext = require('node-require-context')

module.exports = function (app) {
  const files = requireContext("..", true, /(modules)\/\w+\/(routes)\/\w+\.js/)

  files.keys().forEach(file => {
    const { routeName, routes } = files(file)
    app.use(routeName, routes)
  })
}