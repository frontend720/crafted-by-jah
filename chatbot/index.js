const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

app.use(express.json())

mongoose.connect(process.env.URI)

app.use("/", require("./routes/chatRouter.js"))


app.listen(process.env.PORT, ()=>{
    console.log("Listening on PORT 3500")
})