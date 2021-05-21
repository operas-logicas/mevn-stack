const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255
  },
  
  body: String,

  dueDate: {
    type: Date,
    default: Date.now
  },

  completed: {
    type: Boolean,
    default: false
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

taskSchema.set('timestamps', true)

module.exports = mongoose.model('Task', taskSchema)
