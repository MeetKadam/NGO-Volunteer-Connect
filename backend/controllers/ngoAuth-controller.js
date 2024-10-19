const User = require("../models/ngouser-model");
const bcrypt = require("bcryptjs");



const home = async (req, res) => {
    try {
      res.status(200).json({ msg: "Welcome to our home page" });
    } catch (error) {
      console.log(error);
    }
  };
  
  // *-------------------
  // Registration Logic
  // *-------------------
// *-------------------
// Registration Logic
// *-------------------
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, city, darpan, password } = req.body;

    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user
    const userCreated = await User.create({
      name,
      email,
      phone,
      city,
      darpan,
      password,
    });

    // Send success response with token and user ID
    res.status(201).json({
      msg: "Registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
    // Handle error by sending appropriate response
    res.status(500).json({ message: "Internal server error" });
  }
};


  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userExist = await User.findOne({ email });
  
      if (!userExist) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // const user = await bcrypt.compare(password, userExist.password);
      const isPasswordValid = await userExist.comparePassword(password);
  
      if (isPasswordValid) {
        res.status(200).json({
          message: userExist,
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        res.status(401).json({ message: "Invalid email or passord " });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

 const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};


  
  module.exports = { home, register,login,user };
  
 