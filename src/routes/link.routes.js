import {
  addLink,
  updateLink,
  getLinks,
  deleteLink,
  getLinksByUsername,
} from "../controllers/link.controller.js";
import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/add").post(verifyJWT, addLink);
router.route("/update/:id").put(verifyJWT, updateLink);
router.route("/getLinks").get(verifyJWT, getLinks);
router.route("/getLinks/:username").get(getLinksByUsername);
router.route("/delete/:id").delete(verifyJWT, deleteLink);
export default router;
