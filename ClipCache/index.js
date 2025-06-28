const express = require("express")
const app = express()
require("dotenv").config()

const cors = require("cors")

app.use(express.json())
app.use(cors())

app.use("/", require("./routes/chatRouter"))

app.listen(process.env.NODE_PORT, ()=> {
    console.log(`Server listening on port ${process.env.NODE_PORT}`)
})
