const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require('cors');
require('dotenv').config()
const Model = require('./model/model')

app.use(bodyParser.json())

const routes = require('./route/routes')

app.get('/', (req, res) => {
    res.json({ msg: 'Hello World ' })
})

app.use(cors({
    origin: 'https://secure-user-frontend.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.get('/find', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

app.use('/', routes)

app.listen(process.env.PORT, () => {
    console.log('Server Running in port ' + process.env.PORT)
})
