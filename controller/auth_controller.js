

const register = (req, res) => {
  res.send("register.. hello world")
  //get user data
  // const {firstName, lastName, email, password} = req.body;
  // console.log(firstName, lastName, email, password);
  //check existance of data
  //validation layer
  //checking db for existing user
  //encrypting password
  //saving user to db
  //send response to client
}
const login = (req, res) => {
  res.send("login.. hello world")
  
}
module.exports = { login, register }