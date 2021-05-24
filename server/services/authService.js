const jwt = require('jsonwebtoken')

function generateJWT(user) {
  const payload = {
    username: user.username,
    id: user._id
  }

  return jwt.sign(payload, process.env.JWT_PRIVATE_KEY)
}

module.exports = {
  generateJWT
}
