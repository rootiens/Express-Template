import express from "express";
import * as UserController from "../controllers/UserController";
import { protect } from "./../middlewares/AdminMiddleware";

const router = express.Router();

router.post("/", protect, UserController.create);

export default router;
