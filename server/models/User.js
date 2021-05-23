const mongoose = require('mongoose')
const StringUtil = require('../utilities/StringUtil')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
    unique: true
  },

  firstName: {
    type: String,
    minLength: 3,
    maxLength: 100
  },

  lastName: {
    type: String,
    minLength: 3,
    maxLength: 100
  },

  password: {
    type: String,
    required: true,
    length: 60
  }
})

userSchema.set('timestamps', true)

userSchema.statics.validateRequest = body => {
  let errors = ''

  if (StringUtil.isEmpty(body.username))
    errors += 'Username is required. '

  if (StringUtil.isEmpty(body.password))
    errors += 'Password is required. '

  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  }
}

userSchema.pre('save', function(next) {
  this.username = this.username.toLowerCase()
  this.firstName = this.firstName.toLowerCase()
  this.lastName = this.lastName.toLowerCase()
  next()
})

userSchema.virtual('fullName').get(function() {
  const first = StringUtil.capitalize(this.firstName)
  const last = StringUtil.capitalize(this.lastName)
  return `${first} ${last}`
})

module.exports = mongoose.model('User', userSchema)
