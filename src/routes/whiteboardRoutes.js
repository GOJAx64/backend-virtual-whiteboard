import { Router } from "express";
import { addWhiteboard, deleteWhiteboard, editWhiteboard, getWhiteboard } from "../controllers/whiteboardController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.post('/',      checkAuth, addWhiteboard);
router.get('/:id',    checkAuth, getWhiteboard);
router.put('/:id',    checkAuth, editWhiteboard);
router.delete('/:id', checkAuth, deleteWhiteboard);

export default router;