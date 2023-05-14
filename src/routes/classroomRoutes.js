import { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import { 
    addMember, 
    deleteClassroom, 
    deleteMember, 
    editClassroom, 
    getClassroom, 
    getClassrooms, 
    newClassroom, 
    searchUser } from "../controllers/classroomController.js";

const router = Router();

router.get('/',       checkAuth, getClassrooms);
router.post('/',      checkAuth, newClassroom);
router.get('/:id',    checkAuth, getClassroom);
router.put('/:id',    checkAuth, editClassroom);
router.delete('/:id', checkAuth, deleteClassroom);

router.post('/member',       checkAuth, searchUser);
router.post('/member/:id',   checkAuth, addMember);
router.delete('/member/:id', checkAuth, deleteMember);

export default router;