class UserController {
  // Find all users
  index(req, res) {
    return res.status(200).json({ message: 'users.index' })
  }
  
  // Find user by id
  show(req, res) {
    return res.status(200).json({ message: 'users.show'})
  }
}

module.exports = new UserController
