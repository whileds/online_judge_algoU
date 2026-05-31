const express = require('express');
const routes = require('./routes/auth_routes');
const connectDB = require('./database/auth_db');
const app = express();
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
app.use("/", routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});