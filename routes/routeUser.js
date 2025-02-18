import express from "express";
import { getAllUser, register, login, logout } from "../controllers/User.js";

const router = express.Router();

router.get("/user", getAllUser);
router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);

export default router;
