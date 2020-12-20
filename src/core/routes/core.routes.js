const { auth } = require( `${ __srcdir }/core/routes/middlewares/auth.middleware` )

module.exports = function (name, controller) {
  this.router = require('express').Router()
  const lowerCase = name.toLowerCase()

  this.router.post(
    '/', 
    auth(`${lowerCase}.create`),
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
    auth(`${lowerCase}.read`),
    controller.readOneById.bind(controller)
  )
    
  this.router.patch(
    '/:id',
    auth(`${lowerCase}.update`),
    controller.updateOne.bind(controller)
  )

  this.router.patch(
    '/:id/trash', 
    auth(`${lowerCase}.trash`),
    controller.trashOne.bind(controller)
  )

  this.router.patch(
    '/:id/restore', 
    auth(`${lowerCase}.restore`),
    controller.restoreOne.bind(controller)
  )

  this.router.delete(
    '/:id',
    auth(`${lowerCase}.delete`),
    controller.deleteOnePermanently.bind(controller)
  )

  return this.router
}