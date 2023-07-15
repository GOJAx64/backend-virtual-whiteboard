import { Router } from "express";
import { getMessages } from "../controllers/socketController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.post('/:id', checkAuth, getMessages);

export default router;