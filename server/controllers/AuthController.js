const User = require('../models/User')

class AuthController {  
  // Login new user
  async login(req, res) {
    const validation = User.validateRequest(req.body, false)
    if (!validation.isValid)
      return res.status(400).json({ message: validation.message })
  
    const user = await User.findOne({
      username: req.body.username.toLowerCase()
    })
    if (!user) return res.status(401).json({ error: 'Invalid credentials!' })

    const passwordsMatch = await User.validatePassword(
      req.body.password, user.password
    )
    if (!passwordsMatch) res.status(401).json({ error: 'Invalid credentials!' })
  
    return res.status(204).json()
  }
}

module.exports = new AuthController()
