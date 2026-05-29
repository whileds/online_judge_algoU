const express = require('express');
const routes = require('./routes/auth_routes');
const app = express();

// app.get("/",(req,res) => {
//   res.send("hello world")
// });
// app.get("/login",(req,res) => {
//   res.send("login hello world")
// });
// app.get("/register",(req,res) => {
//   res.send("register hello world")
// });

app.use("/", routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});