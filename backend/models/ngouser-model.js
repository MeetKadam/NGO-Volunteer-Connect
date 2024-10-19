const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true, 
  },
  darpan:{
    type: String,
    required: true, 
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  // Check if the password is modified; if not, skip hashing
  if (!user.isModified("password")) {
      return next();
  }

  try {
      const saltRound = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, saltRound);
      user.password = hashedPassword;
      next(); // Call next when password is hashed
  } catch (error) {
      next(error); // Pass error to next middleware
  }
});


  userSchema.methods.generateToken = async function () {
    console.log("I am token");
    try {
      return jwt.sign(
        {
          userId: this._id.toString(),
          email: this.email,
          isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );
    } catch (error) {
      console.error("Token Error: ", error);
    }
  };

  userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const NgoUser = new mongoose.model("NgoUser",userSchema);
module.exports=NgoUser;