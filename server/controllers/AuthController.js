const User = require('../models/User')
const { generateJWT } = require('../services/authService')

class AuthController {  
  // Login new user
  async login(req, res) {
    // Request validation
    const validation = User.validateRequest(req.body, false)
    if (!validation.isValid)
      return res.status(400).json({ error: validation.error })
  
    // User validation
    const user = await User.findOne({
      username: req.body.username.toLowerCase()
    })
    if (!user) return res.status(401).json({ error: 'Invalid credentials!' })

    // Password validation
    const passwordsMatch = await User.validatePassword(
      req.body.password, user.password
    )
    if (!passwordsMatch) res.status(401).json({ error: 'Invalid credentials!' })
  
    // Success! So generate and return auth token
    const token = generateJWT(user)

    return res.status(200).json({ token })
  }
}

module.exports = new AuthController()
