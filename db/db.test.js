const { findUser, saveUser, connect, disconnect } = require("./db")
const User = require("../api/models/User")
const mongoose = require("mongoose")

beforeAll(async () => {
    await connect("test-db")
    await mongoose.connection.dropDatabase();
})

afterAll(async () => {
    await disconnect()
})

const validUser = {
    "firstName": "john",
    "lastName": "doe",
    "address": "123 Candy Lane",
    "city": "Brockton",
    "state": "MA",
    "zip": "02301",
    "email": "johndoe@mail.com",
    "password": "password123"
}

describe("Users", () => {
    test("Should create a new user", async () => {
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            ...validUser
        })
        const newUser = await saveUser(user)

        expect(newUser.firstName).toEqual("john")
        expect(newUser.lastName).toEqual("doe")
        expect(newUser.address).toEqual("123 Candy Lane")
        expect(newUser.city).toEqual("Brockton")
        expect(newUser.state).toEqual("MA")
        expect(newUser.zip).toEqual("02301")
        expect(newUser.email).toEqual("johndoe@mail.com")
    })

    test("Should find a user in the db", async () => {
        const user = await findUser({ email: "johndoe@mail.com" })
        expect(user.firstName).toEqual("john")
        expect(user.lastName).toEqual("doe")
        expect(user.address).toEqual("123 Candy Lane")
        expect(user.city).toEqual("Brockton")
        expect(user.state).toEqual("MA")
        expect(user.zip).toEqual("02301")
        expect(user.email).toEqual("johndoe@mail.com")
    })
})