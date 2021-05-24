const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

function setDevEnv(app) {
  // Set environment vars
  process.env.NODE_ENV = 'development'
  process.env.DB_URL = 'mongodb://localhost:27017/mevn-stack'
  process.env.JWT_PRIVATE_KEY = 'mySuperSecretKey'

  // Register middleware
  app.use(express.json())
  app.use(morgan('dev'))
  app.use(cors())
}

function setProdEnv(app) {
  // Check for environment vars
  if (!process.env.DB_URL) {
    console.error('DB_URL is undefined!')
    process.exit(1)
  }
  
  if (!process.env.JWT_PRIVATE_KEY) {
    console.error('JWT_PRIVATE_KEY is undefined!')
    process.exit(1)
  }

  // Register middleware
  app.use(express.json())
  app.use(express.static(__dirname + '/../dist/'))
}

module.exports = function(app) {
  if (process.env.NODE_ENV !== 'production') setDevEnv(app)
  else setProdEnv(app)
}
