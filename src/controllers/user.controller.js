import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty,etc
  // check if user already exists - findby username or email
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    throw new Error("Please fill all the fields");
  }
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const securedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username: username.toLowerCase(),
    email: email,
    password: password,
    name: name,
  });
  // generating token
  const data = {
    user: {
      id: user.id,
      username: user.username,
    },
  };
  const authtoken = jwt.sign(data, process.env.JWT_SECRET_KEY);

  return res.status(201).json({ success: true, authtoken });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // checking if user exists or not
  let user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User doesn't exists!!" });
  }
  // checking entered password and database password
  const passwordMatch = await bcrypt.compare(password, user.password);
  // if no match
  if (!passwordMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid password!!" });
  }
  // generating token
  const data = {
    user: {
      id: user.id,
      username: user.username,
    },
  };
  const authtoken = jwt.sign(data, process.env.JWT_SECRET_KEY);
  res.status(201).json({ success: true, authtoken });
});

export { registerUser, loginUser };
