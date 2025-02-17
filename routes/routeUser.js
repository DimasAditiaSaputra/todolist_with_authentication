import express from "express";
import { getAllUser, register, login } from "../controllers/User.js";

const router = express.Router();

router.get("/user", getAllUser);
router.post("/register", register);
router.post("/login", login);

export default router;
