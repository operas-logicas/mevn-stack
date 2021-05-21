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
    required: true,
    minLength: 3,
    maxLength: 100
  },

  lastName: {
    type: String,
    required: true,
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

userSchema.virtual('fullName').get(() => {
  const first = StringUtil.capitalize(this.firstName)
  const last = StringUtil.capitalize(this.lastName)
  return `${first} ${last}`
})

userSchema.pre('save', next => {
  this.username = this.username.toLowerCase()
  this.firstName = this.firstName.toLowerCase()
  this.lastName = this.lastName.toLowerCase()
  next()
})

module.exports = mongoose.model('User', userSchema)
