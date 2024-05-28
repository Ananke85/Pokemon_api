const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

// const blogRouter = require("./mongo/router/blogRouter");
// const { connectDB } = require("./mongo/connection");

const app = express();
app.use(cors())
app.use(express.json());
// app.use("/pokenews", blogRouter);

// if (process.env.MONGO_URL) {
//   connectDB().then(() => console.log("Connected to database!"));
// }

module.exports = app;