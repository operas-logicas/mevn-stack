const User = require('../models/User')
const userShowResource = require('../resources/userShowResource')

class RegisterController {
  // Register new user
  async register(req, res) {
    const validation = User.validateRequest(req.body)
    if (!validation.isValid)
      return res.status(400).json({ error: validation.error })
      
    try {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
      })
  
      await user.save()
      return res.status(201).json(userShowResource(user))

    } catch (error) {
      if (error.code === 11000)
        return res.status(400).json({ error: 'Username already taken!' })
      
      const errors = [];
      for (const field in error.errors)
        errors.push(error.errors[field].message)
      return res.status(400).json({ error: errors.join(' ') })
    }
  }
}

module.exports = new RegisterController()
