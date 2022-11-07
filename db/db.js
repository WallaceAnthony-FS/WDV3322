const mongoose = require("mongoose")
require("dotenv").config()

const User = require("../api/models/User")

const connect = async (dbName) => {
    mongoose.connect(process.env.dburl + dbName || "test-db")
}

const disconnect = async () => {
    await mongoose.connection.close()
}

const findUser = async (obj) => {
    let found = await User.findOne({ email: obj.email }).exec()
    return found
}

const saveUser = async (user) => {
    await user.save()
    return user
}

module.exports = {
    findUser,
    saveUser,
    connect,
    disconnect
}