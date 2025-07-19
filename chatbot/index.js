const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const morgan = require("morgan")
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(process.env.URI)

app.use("/", require("./routes/chatRouter.js"))
app.use("/chat", require("./routes/conversationRouter.js"))


app.listen(process.env.PORT, ()=>{
    console.log("Listening on PORT 3500")
})