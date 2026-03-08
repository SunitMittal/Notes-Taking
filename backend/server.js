const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());

app.use(cors({ origin: "*", credentials: true }));

const connectDB = require("./config/db");
connectDB();

const routes = require("./routes/routes");
app.use("/", routes);

const jwt = require("jsonwebtoken");


app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

const port = process.env.PORT||6000;
app.listen(port, () => console.log(`Server is running on Port ${port}`));

module.exports = app;
