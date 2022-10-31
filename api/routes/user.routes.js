const express = require("express")
// const User = require("../models/User")

const router = express.Router()

// users/profile
router.get("/profile", (req, res) => {
    res.send({
        message: `${req.path} - ${req.method}`
    })
})

// users/signup
router.post("/signup", (req, res) => {
    res.send({
        message: `${req.path} - ${req.method}`
    })
})

// users/login
router.post("/login", (req, res) => {
    res.send({
        message: `${req.path} - ${req.method}`
    })
})

module.exports = router