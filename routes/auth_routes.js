const express= require("express");
const {login,register,profileController} = require("../controller/auth_controller");
const router = express.Router();
const auth = require("../middleware/user_auth_middleware");

router.get("/",(req,res) => {
  res.send("hello world")
});

// router.get("/login",(req,res) => {
//   res.send("login hello world")
// });
// router.get("/register",(req,res) => {
//   res.send("register hello world")
// });

router.post("/login", login);
router.post("/register", register);
router.get("/profile",auth,profileController);

module.exports = router;