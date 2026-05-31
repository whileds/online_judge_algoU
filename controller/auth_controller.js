
const AuthUser = require('../models/auth_user');
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const register = async (req, res) => {
  // res.send("register.. hello world")
  //get user data
  const {firstName, lastName, email, password} = req.body;
  console.log(firstName, lastName, email, password);
  
  //check existance of data
  if(!firstName || !lastName || !email || !password){
    return res.status(400).json({message: "All fields are required"})
  }

  //validation layer
  
  //checking db for existing user
  const existingUser=await AuthUser.findOne({email});
  if(existingUser){
    return res.status(401).json({message: "User already exists"})
  }

  //encrypting password
  const hashedPassword = bcrypt.hashSync(password, 10);

  //saving user to db
  const user = await AuthUser.create({    firstName,  lastName,    email,    password: hashedPassword  });
  
  //send response to client
  const token = jwt.sign({id: user._id, email}, process.env.JWT_SECRET, {expiresIn: "1h"});
  return res.status(201).json({message: "User registered successfully", user, token});
}
const login = async (req, res) => {
  // res.send("login.. hello world")
  const {email, password} = req.body;
  console.log(email, password);

  if(!email || !password){
    return res.status(400).json({message: "All fields are required"})
  }

  const existingUser=await AuthUser.findOne({email});
  if(!existingUser){
    return res.status(401).json({message: "Invalid credentials"})
  }
  
}
module.exports = { login, register }