// Dependencies
import { Schema, model } from 'mongoose'

const TareaSchema = new Schema({
  nombre: { type: String, required: true },
  prioridad: { type: String },
  fecha_vencimiento: { type: Date },
  idUser: { type: String, required: true }
})

const Tarea = model('tareas', TareaSchema)

export default Tarea
