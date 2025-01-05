const Model = require("../model/model")
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Model.findOne({ email })
        if (user) {

            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const response = { message: { value: true, text: user.name } };
                return res.json(response);
            }
            else {
                return res.json({ message: { value: false, text: 'Password Incorrect' }, })
            }
        }
        else {
            return res.json({ message: { value: false, text: 'User Not Found' } })
        }
    } catch (error) {
        res.json("Error " + error)
    }
}
const check = async (req, res) => {
    try {
        const { email } = req.body
        const user = await Model.findOne({ email })
        if (user) {
            return res.json({ message: true });
        }
        else {
            return res.json({ message: false })
        }
    } catch (error) {
        res.json("Error " + error)
    }
}
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const salt = await bcrypt.genSalt(10); // Generates a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hashes the password with the salt

        const result = await Model.create({ name, email, password: hashedPassword })
        if (result) {
            return res.json({ message: { value: true, text: name } })
        }

    } catch (error) {
        res.json("Error " + error)
    }
}

module.exports = { login, check, signup }