import express from "express";
import { AuthController } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/me", verifyToken, AuthController.me); // Protected route

export default router;