const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

require("dotenv").config()
app.use(cors())
app.use(morgan("dev"))

console.log(process.env.VENICE_API_KEY)

app.use(express.json())

app.use("/", require("./chatRouter.js"))

app.listen(4500, () => {
    console.log("Server connected on port 4500")
})