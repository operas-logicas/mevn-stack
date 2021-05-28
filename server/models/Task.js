const mongoose = require('mongoose')
const StringUtil = require('../utilities/StringUtil')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100
  },
  
  body: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255
  },

  dueDate: {
    type: Date,
    required: true
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

// Validate the request ahead of mongoose
taskSchema.statics.validateRequest =
  body => {
    let errors = ''

    if (StringUtil.isEmpty(body.title))
      errors += 'Title is required. '

    if (StringUtil.isEmpty(body.body))
      errors += 'Body is required. '

    return {
      isValid: StringUtil.isEmpty(errors),
      error: errors
    }
}

module.exports = mongoose.model('Task', taskSchema)
