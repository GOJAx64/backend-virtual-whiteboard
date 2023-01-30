import { Router } from "express";
import { addMember, deleteClassroom, deleteMember, editClassroom, getClassroom, getClassrooms, newClassroom } from "../controllers/classroomController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.get('/',       checkAuth, getClassrooms);
router.post('/',      checkAuth, newClassroom);
router.get('/:id',    checkAuth, getClassroom);
router.put('/:id',    checkAuth, editClassroom);
router.delete('/:id', checkAuth, deleteClassroom);

router.post('/add_member',      checkAuth, addMember);
router.delete('/delete_member', checkAuth, deleteMember);

export default router;