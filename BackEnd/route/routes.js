const express = require("express")
const server = express.Router()

const { login, check, signup } = require('../controller/controller')

server.post('/login', login)
server.post('/signup', signup)
server.post('/check', check)


module.exports = server