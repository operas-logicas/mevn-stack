const User = require('../models/User')
const StringUtil = require('../utilities/StringUtil')

class AuthController {
  _validateLogin(body) {
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
  
  // Login new user
  async login(req, res) {
    const validation = this._validateLogin(req.body)
    if (!validation.isValid)
      return res.status(400).json({ message: validation.message })
  
    const user = await User.findOne({
      username: req.body.username.toLowerCase()
    })
    if (!user) return res.status(401).json({ error: 'Invalid credentials!' })

    // TODO: Password validation
    const passwordsMatch = true
    if (!passwordsMatch) res.status(401).json({ error: 'Invalid credentials!' })
  
    return res.status(204).json()
  }
}

module.exports = new AuthController()
