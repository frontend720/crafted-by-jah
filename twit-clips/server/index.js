/* eslint-disable no-undef */
const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const morgan = require("morgan")
const cors = require("cors")

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend's origin
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

mongoose.connect(process.env.URI)

app.use("/", require("./videoRouter"))

app.listen(4200, ()=>{
    console.log("Server listening on port 4200")
})