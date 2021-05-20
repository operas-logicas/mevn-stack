const auth = require('./routers/auth')
const register = require('./routers/register')
const tasks = require('./routers/tasks')
const users = require('./routers/users')

module.exports = function(app) {
  app.use('/api/auth', auth)
  app.use('/api/register', register)
  app.use('/api/tasks', tasks)
  app.use('/api/users', users)
}
