/* eslint-disable no-undef */
const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const morgan = require("morgan")
const cors = require("cors")

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

mongoose.connect(process.env.URI)

app.use("/", require("./videoRouter"))
app.use("/auth", require("./authRouter"))

app.listen(4200, ()=>{
    console.log("Server listening on port 4200")
})