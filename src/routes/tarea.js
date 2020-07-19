// Dependencies
import { Router } from 'express'
import moment from 'moment'

// Model
import Tarea from '@models/Tarea'

export default (app) => {
  const router = Router()

  app.use('/tareas', router)

  router.get('/:id', async (req, res, next) => {
    // cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
    const { id } = req.params
    try {
      const tareas = await Tarea.find({ idUser: id }).exec()
      res.status(200).json({
        tareas
      })
    } catch (err) {
      next(err)
    }
  })

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { body: todo } = req

    try {
      const updatedTodoId = await Tarea.findOneAndUpdate(
        { _id: id },
        { $set: todo },
        { new: true, useFindAndModify: false }
      )

      res.status(200).json({
        data: updatedTodoId,
        message: 'updated'
      })
    } catch (err) {
      next(err)
    }
  })

  router.get('/:id', async (req, res, next) => {
    // cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
    const { id } = req.params

    try {
      const user = await Tarea.findOne({ _id: id })

      res.status(200).json({
        user
      })
    } catch (err) {
      next(err)
    }
  })

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params

    try {
      const deleteId = await Tarea.findOneAndDelete({ _id: id })

      res.status(200).json({
        data: deleteId
      })
    } catch (err) {
      next(err)
    }
  })

  router.post('/', async (req, res, next) => {
    const { body: todo } = req

    try {
      const create = await Tarea.create(todo)

      res.status(201).json({
        data: create,
        message: 'created'
      })
    } catch (err) {
      next(err)
    }
  })

  router.put('/', async (req, res, next) => {
    const { body: tarea } = req
    try {
      const updatedId = await Tarea.findOneAndUpdate(
        { _id: tarea._id },
        { $set: tarea },
        { new: true, useFindAndModify: false }
      )

      res.status(200).json({
        data: updatedId,
        message: 'updated'
      })
    } catch (err) {
      next(err)
    }
  })

  router.get('/date/expired/:id', async (req, res, next) => {
    const { id } = req.params
    const date = moment().format('YYYY-MM-DDT00:00:00.000+00:00')

    try {
      const data = await Tarea.find({
        idUser: id,
        fecha_vencimiento: {
          $gte: date
        }
      })

      res.status(200).json({
        data
      })
    } catch (err) {
      next(err)
    }
  })
}
