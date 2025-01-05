const mongoose = require("mongoose")

mongoose.connect(process.env.DBCONNECTION)
    .then(console.log('Database Connected'))
    .catch(err => console.log(err))

const schema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
})
const noteModel = new mongoose.model('users', schema)

module.exports = noteModel