import express from "express";
import * as AuthController from "../controllers/AuthController";

const router = express.Router();

router.post("/login", AuthController.login);

export default router;
