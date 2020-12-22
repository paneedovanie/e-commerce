const { auth } = require( `${ __srcdir }/core/routes/middlewares/auth.middleware` )

module.exports = function (name, controller, middleware = { create: () => next(), update: () => next(), checkId: () => next() }) {
  this.router = require('express').Router()
  const lowerCase = name.toLowerCase()

  this.router.post(
    '/', 
    [ auth(`${lowerCase}.create`), middleware.create ],
    controller.createOne.bind(controller)
  )

  this.router.get(
    '/', 
    auth(`${lowerCase}.read`),
    controller.readAll.bind(controller)
  )

  this.router.get(
    '/trashed', 
    auth(`${lowerCase}.trashed`),
    controller.readAllTrash.bind(controller)
  )

  this.router.get(
    '/:id', 
    [auth(`${lowerCase}.read`), middleware.checkId],
    controller.readOneById.bind(controller)
  )
    
  this.router.patch(
    '/:id',
    [ auth(`${lowerCase}.update`), middleware.checkId, middleware.update ],
    controller.updateOne.bind(controller)
  )

  this.router.patch(
    '/:id/trash', 
    [ auth(`${lowerCase}.trash`), middleware.checkId ],
    controller.trashOne.bind(controller)
  )

  this.router.patch(
    '/:id/restore', 
    [ auth(`${lowerCase}.restore`), middleware.checkId ],
    controller.restoreOne.bind(controller)
  )

  this.router.delete(
    '/:id',
    [ auth(`${lowerCase}.delete`), middleware.checkId ],
    controller.deleteOnePermanently.bind(controller)
  )

  return this.router
}