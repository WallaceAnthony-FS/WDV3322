const User = require("../api/models/User")

const findUser = async (obj) => {
    console.log(obj)
    let found = await User.findOne({ email: obj.email }).exec()
    console.log(found)
    return found
}

const saveUser = async (user) => {
    await user.save()
}

module.exports = {
    findUser,
    saveUser
}