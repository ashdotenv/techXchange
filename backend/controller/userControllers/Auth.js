const mongoose = require("mongoose");
const { z, ZodError } = require("zod");
const { userModel } = require("../../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
const UserRole = z.enum(["Admin", "User"]);

const userSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  role: UserRole,
});

const validateUserRole = (role) => {
  try {
    return UserRole.parse(role);
  } catch (error) {
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

    const existingAdmin = await userModel.findOne({ role: "Admin" });

    if (validRole === "Admin" && existingAdmin) {
      return res.status(400).json({ error: "Admin user already exists" });
    }

    const existingUser = await userModel.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashPass = await bcrypt.hash(userData.password, 10);
    const newUser = new userModel({
      ...userData,
      role: validRole,
      password: hashPass,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    } else {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

const loginSchema = z.object({
  username: z.string().min(3).max(100).optional(),
  email : z.string().email().optional(),
  password: z.string().min(6),
});

const login = async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const credential = username.includes("@");

    const user = await userModel.findOne({
      $or: [
        { username: credential ? username : undefined },
        { email: credential ? username : undefined },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 360 * 60 * 60 * 1000,
        signed: true,
        expires: new Date(Date.now() + 360 * 60 * 60 * 1000),
      })
      .status(200).json({success:true,message:"Login Successful"})
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    } else {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = {
  signup,
  login,
};
