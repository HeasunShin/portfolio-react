require("dotenv").config();

const express = require("express");
const cors = require("cors");
const projectsRouter = require("./routes/projects");
const usersRouter = require("./routes/users");
const session = require("express-session");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/projects", projectsRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
