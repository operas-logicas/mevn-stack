const User = require('../models/User')
const StringUtil = require('../utilities/StringUtil')

class RegisterController {
  #validateRegister(body) {
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
  
  // Register new user
  async register(req, res) {
    const validation = this.#validateRegister(req.body)
    if (!validation.isValid)
      return res.status(400).json({ message: validation.message })
  
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })
  
      await user.save()
      return res.status(201).json(user)

    } catch (error) {
      if (error.code === 11000)
        return res.status(400).json({ error: 'Username already taken!' })
      
      return res.status(500).json('Something went wrong!')
    }
  }
}

module.exports = new RegisterController
