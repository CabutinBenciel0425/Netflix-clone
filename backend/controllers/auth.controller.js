import bcrypt from "bcryptjs";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { avatarGenerator } from "../utils/avatarGenerator.js";
import { BCRYPT_SALT_ROUNDS } from "../utils/constants.js";
import { tokenGenerator } from "../utils/tokenGenerator.js";

export const signUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(
      400,
      existingUser.email === email
        ? "User with this email already exists"
        : "User with this username already exists",
    );
  }

  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);

  const image = avatarGenerator();

  const newUser = new User({
    email,
    username,
    password: hashedPassword,
    image,
  });

  await newUser.save();

  const { password: _, ...userWithoutPassword } = newUser.toObject();
  const token = tokenGenerator(newUser._id, res);

  if (!token) {
    throw new ApiError(401, "Something went wrong with generating the token");
  }

  return res.status(201).json({
    success: true,
    message: "Account successfully created",
    data: userWithoutPassword,
  });
});

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide your email / password");
  }

  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser) {
    throw new ApiError(404, "Invalid credentials");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = tokenGenerator(existingUser._id, res);

  if (!token) {
    throw new ApiError(401, "Something went wrong with generating the token");
  }

  const { password: _, ...userWithoutPassword } = existingUser.toObject();

  return res.status(201).json({
    success: true,
    message: "Successfully logged in",
    data: userWithoutPassword,
  });
});

export const signout = asyncHandler(async (req, res) => {
  res.clearCookie("authToken");

  res.status(200).json({
    success: true,
    message: "You successfully been logged out",
  });
});

export const authCheck = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
