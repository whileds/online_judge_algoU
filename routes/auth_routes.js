const express= require("express");
const {login,register} = require("../controller/auth_controller");
const router = express.Router();


router.get("/",(req,res) => {
  res.send("hello world")
});

// router.get("/login",(req,res) => {
//   res.send("login hello world")
// });
// router.get("/register",(req,res) => {
//   res.send("register hello world")
// });

router.get("/login", login);
router.get("/register", register);

module.exports = router;