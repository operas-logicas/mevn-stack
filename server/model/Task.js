const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: String,
  
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
