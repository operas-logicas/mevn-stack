const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

function setDevEnv(app) {
  process.env.NODE_ENV = 'development'
  app.use(express.json())
  app.use(morgan('dev'))
  app.use(cors())
}

function setProdEnv(app) {
  app.use(express.json())
  app.use(express.static(__dirname + '/../dist/'))
}

module.exports = function(app) {
  if (process.env.NODE_ENV !== 'production') setDevEnv(app)
  else setProdEnv(app)
}
