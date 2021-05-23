const User = require('../models/User')
const _ = require('lodash')

class RegisterController {
  // Register new user
  async register(req, res) {
    const validation = User.validateRequest(req.body)
    if (!validation.isValid)
      return res.status(400).json({ error: validation.message })
      
    try {
      const user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      })
  
      await user.save()
      return res.status(201).json(
        _.pick(user, ['_id', 'username', 'firstName', 'lastName'])
      )

    } catch (error) {
      if (error.code === 11000)
        return res.status(400).json({ error: 'Username already taken!' })
      
      console.log(error.message)
      return res.status(500).json('Something went wrong!')
    }
  }
}

module.exports = new RegisterController()
