const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { Types } = require("mongoose")
const { findUser, saveUser } = require("../../db/db")
const User = require("../models/User")

const router = express.Router()
const bcrypt = require("bcrypt")
const checkAuth = require("../../auth/checkAuth")

// users/profile
router.get("/profile", checkAuth, (req, res) => {
    res.status(200).json({
        message: req.userData
    })
})

// users/signup
router.post("/signup", async (req, res) => {
    // findUser by email address
    const foundUser = await findUser(req.body)
    // if user exists return 409 message user exists
    if(foundUser) return res.status(409).json({ message: "User already exists."})
    // else: encrypt password
    else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if(err){
                return res.status(500).json({ message: err.message })
            } else {
                // create new user object
                const user = new User({
                    "_id": new Types.ObjectId(),
                    ...req.body,
                    password: hash
                })
                // save user
                await saveUser(user)
                // set password to null on response to not leak hashed passwords
                res.status(200).send({ user: { ...user._doc, password: null }})
            }
        })
    }
})

// users/login
router.post("/login", async (req, res) => {
    // findUser
    const foundUser = await findUser(req.body)
    // if user not found then return 401 message Authorization failed
    if(!foundUser) res.status(401).json({ message: "Authorization failed." })
    // else: compare passwords
    else{
        bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
            if(err) return res.status(500).json({ message: err.message })
            if(result){
                const token = jwt.sign({
                    _id: foundUser._id,
                    email: foundUser.email,
                    firstName: foundUser.firstName
                }, process.env.jwt_key)
                return res.status(200).json({ token })
            } else {
                return res.status(401).json({
                    message: "Authorization Failed"
                })
            }
        })
    }
    // check for error in callback function
    // if no error return 200 message Authorization Successful
})

module.exports = router