import express from "express";
import { createTodo, getAllTodo } from "../controllers/Todolist.js";
import { status } from "../middleware/Status.js";

const router = express.Router();

router.get("/todolist", status, getAllTodo);
router.post("/todolist", status, createTodo);

export default router;
