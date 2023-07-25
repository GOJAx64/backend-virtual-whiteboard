import { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import { addActivity, deleteActivity, editActivity, getActivities, getActivity } from "../controllers/activityController.js";

const router = Router();

router.post('/:id',   checkAuth, addActivity);
// router.get('/:id',    checkAuth, getActivity);
router.get('/:id',    checkAuth, getActivities);
router.put('/:id',    checkAuth, editActivity);
router.delete('/:id', checkAuth, deleteActivity);

export default router;