import { Activity } from "../models/Activity.js";
import { Classroom } from "../models/Classroom.js";

export const addActivity = async(req, res) => {
    const { id } = req.params;
    const classroomExist = await Classroom.findByPk(id);

    if(!classroomExist) {
        const error = new Error("El Aula no existe");
        return res.status(404).json({ msg: error.message});
    }

    if(classroomExist.userId.toString() !== req.user.id.toString()) {
        const error = new Error("No tienes permisos para realizar esta acción");
        return res.status(401).json({ msg: error.message});
    }
    
    try {
        const activity = new Activity(req.body);
        activity.classroomId = id;
        const savedActivity = await activity.save();
        res.json(savedActivity);
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};

export const getActivity = async(req, res) => {
    const { id } = req.params;

    const activity = await Activity.findByPk(id);

    if(!activity) {
        const error = new Error('Actividad no encontrada');
        return res.status(404).json({ msg: error.message});
    }

    // const classroom = await Classroom.findByPk(activity.classroomId)
    // if(classroom.userId.toString() !== req.user.id.toString()) {
    //     const error = new Error('No tienes los permisos para realizar esta acción');
    //     return res.status(403).json({ msg: error.message});
    // }

    res.json(whiteboard);
};

export const getActivities = async(req, res) => {
    const activities = await Activity.findAll({ 
        where: { classroomId: req.params.id }, 
        order: [
            ['dueDate', 'ASC'],
        ]
    });
    res.json(activities);
};

export const editActivity = async(req, res) => {
    const { id } = req.params;

    const activity = await Activity.findByPk(id);
    if(!activity) {
        const error = new Error('Actividad no encontrada');
        return res.status(404).json({ msg: error.message});
    }

    const classroom = await Classroom.findByPk(activity.classroomId)
    if(classroom.userId.toString() !== req.user.id.toString()) {
        const error = new Error('No tienes los permisos para realizar esta acción');
        return res.status(403).json({ msg: error.message });
    }

    activity.title       = req.body.title       || activity.title;
    activity.description = req.body.description || activity.description;
    activity.dueDate     = req.body.dueDate     || activity.dueDate;
    
    try {
        const savedActivity = await activity.save();
        res.json(savedActivity)
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};

export const deleteActivity = async(req, res) => {
    const { id } = req.params;

    const activity = await Activity.findByPk(id);
    if(!activity) {
        const error = new Error('Actividad no encontrada');
        return res.status(404).json({ msg: error.message});
    }

    const classroom = await Classroom.findByPk(activity.classroomId);
    if(classroom.userId.toString() !== req.user.id.toString()) {
        const error = new Error('No tienes los permisos para realizar esta acción');
        return res.status(403).json({ msg: error.message});
    }

    try {
        await activity.destroy();
        res.json({ msg: "Actividad eliminada"});
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};