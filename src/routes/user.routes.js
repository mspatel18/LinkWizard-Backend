import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router();

router.route("/").get((req, res) => {
  res.json({ message: "Server is Running 🚀🚀" });
});

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
export default router;
