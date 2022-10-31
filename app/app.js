const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const userRoutes = require("../api/routes/user.routes")

const app = express()

app.use(morgan("dev"))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// middleware to handle the cors policy
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE")
    }

    next()
})

app.get("/", (req, res, next) => {
    res.status(200).json({message: '🚀 Service is running'})
})

// Routes
app.use("/users", userRoutes)

// add middleware to handle errors and bad url paths
app.use((req, res, next) => {
    const error = new Error("Page not found.")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    })
})

mongoose.connect(process.env.dburl + process.env.dbname, (err) => {
    if(err){
        console.error("Error: ", err.message)
    } else {
        console.log(`Successfully connected to ${process.env.dbname} database.`)
    }
})

module.exports = app