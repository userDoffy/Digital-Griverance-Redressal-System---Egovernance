import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

const saltRounds = 10;
// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "gibbsrfakjfks"

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "error", message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const approved = (role === "Citizen") ? true : false;
    const newUser = await Users.create({ name, email, password: hashedPassword, role, approved });

    res.status(201).json({ status: "success", message: "User registered successfully!" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "error", message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ status: "error", message: "Invalid email or password." });
    }

    if (!user.approved) {
      return res.status(400).json({ status: "error", message: "You haven't been approved yet. Please wait." });
    }

    if (!(user.role === role)) {
      return res.status(400).json({ status: "error", message: "Your role doesn't match." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({ status: "success", message: "Logged in successfully!", token, role });
  } catch (error) {
    next(error);
  }
};
