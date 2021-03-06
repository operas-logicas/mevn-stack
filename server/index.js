const express = require('express')
const connectToMongoDB = require('./config/db')
const setEnvironment = require('./config/env')
const registerRoutes = require('./routes')

const app = express()

// Initialization
setEnvironment(app)
connectToMongoDB()
registerRoutes(app)

app.get('/', (req, res) => {
  if (process.env.NODE_ENV !== 'production')
    return res.send('Running server in development mode.')
  else
    return res.sendFile('index.html', { root: __dirname + '/../dist/'})
})

// Start server
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(
    `Express server listening on ${port} in ${process.env.NODE_ENV} mode.`
  )
})
