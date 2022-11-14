
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    try {
        const [, token] = req.headers.authorization.split(" ")
        const decoded = jwt.verify(token, process.env.jwt_key)
        
        req.userData = decoded
        next()
    } catch (err) {
        res.status(400).json({ message: 'Authorization Failed' })
    }
}
