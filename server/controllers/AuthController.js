const StringUtil = require('../utilities/StringUtil')

class AuthController {
  #validateLogin(body) {
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
  login(req, res) {
    const validation = this.#validateLogin(req.body)
    if (!validation.isValid)
      return res.status(400).json({ message: validation.message })
  
    const user = {
      username: req.body.username,
      password: req.body.password
    }
  
    return res.status(204).json()
  }
}

module.exports = new AuthController
