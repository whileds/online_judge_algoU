
const AuthUser = require('../models/auth_user');
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

const publicUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role
});

const register = async (req, res) => {
  // res.send("register.. hello world")
  //get user data
  const {firstName, lastName, email, password} = req.body;
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
  const token = jwt.sign(
    {id: user._id, email, role: user.role},
    process.env.JWT_SECRET,
    {expiresIn: "1h"}
  );
  return res.status(201).json({
    message: "User registered successfully",
    user: publicUser(user),
    token
  });
}
const login = async (req, res) => {
  // res.send("login.. hello world")
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json({message: "All fields are required"})
  }

  const existingUser=await AuthUser.findOne({email});
  if(!existingUser){
    return res.status(401).json({message: "email not in data base"})
  }
  
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if(!isPasswordCorrect){
    return res.status(401).json({message: "Invalid credentials"})
  }

  const token = jwt.sign({id: existingUser._id,  email: existingUser.email,
   role: existingUser.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
  res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  });
  return res.status(200).json({
    message: "User logged in successfully",
    user: publicUser(existingUser),
    token
  });
} 

const profileController = async (req, res) => {
  const user = await AuthUser.findById(req.user.id);
  if (!user) {
    return res.status(404).json({message: "User not found"});
  }
  return res.status(200).json({user: publicUser(user)});
}
module.exports = { login, register, profileController }
