const mongoose = require("mongoose");
const { z, ZodError } = require("zod");
const { userModel } = require("../../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
const UserRole = z.enum(["Admin", "User"]);

//zod schema for validation
const userSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  role: UserRole,
});

const validateUserRole = (role) => {
  //checking privilege
  try {
    return UserRole.parse(role);
  } catch (error) {
    //throwing zod error for more specific info
    if (error instanceof ZodError) {
      throw new Error("Invalid user role");
    }
    throw error;
  }
};

const signup = async (req, res) => {
  try {
    const userData = userSchema.parse(req.body);
    
    const validRole = validateUserRole(userData.role);
    
    //there can only be 1 admin
    const existingAdmin = await userModel.findOne({ role: "Admin" });
    //making sure adming doesn't already exist
    if (validRole === "Admin" && existingAdmin) {
      return res.status(400).json({ message: "Admin user already exists" });
    }
    
    //making user adming doesn't already exist
    const existingUser = await userModel.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //hashing password 10 rounds
    const hashPass = await bcrypt.hash(userData.password, 10);
    const newUser = new userModel({
      ...userData,
      role: validRole,
      password: hashPass,
    });
    //saving user to db after all validation
    await newUser.save();
    
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      //throwing zod error for more specific info
      return res.status(400).json({ message: error.errors });
    } else {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};
// Login schema for user 
const loginSchema = z.object({
  username: z.string().min(3).max(100).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6),
});
const login = async (req, res) => {
  try {
    // Can be logged with both username and password but the field is username 
    const { username, password } = loginSchema.parse(req.body);
    //if the username contains @ its considered email and email is checked
    let credintial = username.includes("@")
      ? { email: username }
      : { username: username };

    const user = await userModel.findOne(credintial);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // signing JWT with secret 
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET
    );
      // Cookie for authorization 
      //signed for more security 

    res
      .cookie("token", token, {
        secure: true, 
        httpOnly: true,  //not accessible through document object
        sameSite: "none", //set  cross-site cookies 
        signed: true,  //it anything changes on cookie the token is  invalid 
        maxAge: 100 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    } else {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = {
  signup,
  login,
};
