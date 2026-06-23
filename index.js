require("dotenv").config();
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
  quiet: true
});

const express = require('express');
const routes = require('./routes/auth_routes');
const problem = require('./routes/problem_routes');
const run = require('./routes/run_routes');
const aiReview = require('./routes/ai_review_routes');
const connectDB = require('./database/auth_db');
const cookieParser = require("cookie-parser");
const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.get("/",(req,res) => {
//   res.send("hello world")
// });
// app.get("/login",(req,res) => {
//   res.send("login hello world")
// });
// app.get("/register",(req,res) => {
//   res.send("register hello world")
// });
connectDB();
app.get("/", (req, res) => {
  res.send("online judge backend is running");
});
app.use("/auth", routes);
app.use("/problem", problem);
app.use("/run", run);
app.use("/ai-review", aiReview);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
