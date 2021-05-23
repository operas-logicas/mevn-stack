const User = require('../models/User')

class AuthController {  
  // Login new user
  async login(req, res) {
    const validation = User.validateRequest(req.body)
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
