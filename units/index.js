const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan")

require("dotenv").config();

app.use(morgan("dev"))
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);
app.use("/", require("./Routes/userRouter.js"));
app.use("/sessions", require("./Routes/sessionRouter"))

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
