import { Router } from "express";
import { addMember, addWhiteboard, deleteClassroom, deleteMember, deleteWhiteboard, editClassroom, getClassroom, getClassrooms, getWhiteboards, newClassroom } from "../controllers/classroomController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.get('/',                 checkAuth, getClassrooms);
router.post('/new_classroom',   checkAuth, newClassroom);
router.get('/:id',              checkAuth, getClassroom);
router.put('/:id',              checkAuth, editClassroom);
router.delete('/:id',           checkAuth, deleteClassroom);

router.get('/whiteboards/:id',  checkAuth, getWhiteboards);
router.post('/add_whiteboard',  checkAuth, addWhiteboard);
router.delete('/delete_whiteboard', checkAuth, deleteWhiteboard);

router.post('/add_member',      checkAuth, addMember);
router.delete('/delete_member', checkAuth, deleteMember);

export default router;