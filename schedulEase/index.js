const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config();
const app = express();

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.URI)

app.use("/", require("./Routes/userRouter.js"))
app.use("/availability", require("./Routes/availabilityRouter"))
app.use("/appointments", require("./Routes/appointmentRouter.js"))
app.use("/services", require("./Routes/serviceRouter.js"))

app.listen(process.env.PORT, () => {
  console.log("Running on port" + process.env.PORT);
});
