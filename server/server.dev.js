"use strict";

require("dotenv").config();

var express = require("express");

var cors = require("cors");

var projectsRouter = require("./routes/projects");

var usersRouter = require("./routes/users");

var session = require("express-session");

var app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use("/projects", projectsRouter);
app.use("/users", usersRouter);
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("\uC11C\uBC84 \uC2E4\uD589 \uC911: http://localhost:".concat(PORT));
});