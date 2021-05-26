const bcrypt = require('bcrypt')
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

// Validate the request ahead of mongoose
userSchema.statics.validateRequest =
  (body, register = true) => {
    let errors = ''

    if (StringUtil.isEmpty(body.username))
      errors += 'Username is required. '

    if (StringUtil.isEmpty(body.password))
      errors += 'Password is required. '

    if (register) {
      if (StringUtil.isEmpty(body.firstName))
        errors += 'First name is required. '

      if (StringUtil.isEmpty(body.lastName))
        errors += 'Last name is required. '
    }

    return {
      isValid: StringUtil.isEmpty(errors),
      error: errors
    }
}

// Validate password
userSchema.statics.validatePassword = (plain, hashed) => {
  return bcrypt.compare(plain, hashed)
}

userSchema.pre('save', async function(next) {
  this.username = this.username.toLowerCase()
  this.firstName = this.firstName.toLowerCase()
  this.lastName = this.lastName.toLowerCase()
  
  // Hash password
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

userSchema.virtual('fullName').get(function() {
  const first = StringUtil.capitalize(this.firstName)
  const last = StringUtil.capitalize(this.lastName)
  return `${first} ${last}`
})

module.exports = mongoose.model('User', userSchema)
