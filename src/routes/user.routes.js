import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post("/is-verify", verifyJWT, async (req, res) => {
  try {
    const userID = req.user.id;
    const username = req.user.username;
    res.status(201).json({ success: true, id: userID, username: username });
    // console.log("verified");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("server error");
  }
});
export default router;
