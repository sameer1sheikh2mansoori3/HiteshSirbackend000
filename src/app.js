const express = require("express");
const app = express();
//connectDatabase function
const connectDatabase = require('./db.js')
const router = require('./routes/Router.js')
connectDatabase();
//we are adding middlewares
app.use(express.json());
app.use("/api/v1", router)
module.exports = app;