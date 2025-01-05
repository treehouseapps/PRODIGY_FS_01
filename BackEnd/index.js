const express = require('express')
const server = express()
const bodyParser = require("body-parser")
const cors = require('cors');
require('dotenv').config()
const Model = require('./model/model')

server.use(bodyParser.json())

const routes = require('./route/routes')

server.get('/', (req, res) => {
    res.json({ msg: 'Hello World ' })
})

server.get('/find', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

server.use(cors());
server.use('/', routes)

server.listen(process.env.PORT, () => {
    console.log('Server Running in port ' + process.env.PORT)
})
