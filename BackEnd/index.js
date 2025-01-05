const express = require('express')
const server = express()
const bodyParser = require("body-parser")
const cors = require('cors');
require('dotenv').config()


server.use(bodyParser.json())

const routes = require('./route/routes')


server.get('/', (req, res) => {
    res.json({ msg: 'Hello World ' })
})
server.use(cors());
server.use('/', routes)

server.listen(process.env.PORT, () => {
    console.log('Server Running in port ' + process.env.PORT)
})