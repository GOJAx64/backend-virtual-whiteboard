import { Router } from "express";
import { register, authenticate, confirm, forgotPassword, checkToken, newPassword, profile } from '../controllers/authController.js';
// import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.post("/register",               register);
router.post("/login",                  authenticate);
router.get("/confirm/:token",          confirm);
router.post("/forgot_password",        forgotPassword);
router.get("/forgot_password/:token",  checkToken);
router.post("/forgot_password/:token", newPassword);
// router.get('/profile',      checkAuth,  profile);

export default router;