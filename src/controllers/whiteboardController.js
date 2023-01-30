import generateId from "../helpers/generateId.js";
import { Classroom } from "../models/Classroom.js";
import { Whiteboard } from "../models/Whiteboard.js";

export const addWhiteboard = async(req, res) => {
    const classroomExist = await Classroom.findByPk(req.body.classroomId);

    if(!classroomExist) {
        const error = new Error("El Aula no existe");
        return res.status(404).json({ msg: error.message});
    }

    if(classroomExist.userId.toString() !== req.user.id.toString()) {
        const error = new Error("No tienes permisos para realizar esta acción");
        return res.status(401).json({ msg: error.message});
    }

    try {
        const whiteboard = new Whiteboard(req.body);
        whiteboard.id = generateId();
        
        const savedWhiteboard = await whiteboard.save();
        res.json(savedWhiteboard);
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};

export const getWhiteboard = async(req, res) => {
    const { id } = req.params;

    const whiteboard = await Whiteboard.findByPk(id);

    if(!whiteboard) {
        const error = new Error('Pizarrón no encontrado');
        return res.status(404).json({ msg: error.message});
    }

    const classroom = await Classroom.findByPk(whiteboard.classroomId)

    if(classroom.userId.toString() !== req.user.id.toString()) {
        const error = new Error('No tienes los permisos para realizar esta acción');
        return res.status(403).json({ msg: error.message});
    }

    res.json(whiteboard);
};

export const editWhiteboard = async(req, res) => {
    const { id } = req.params;

    const whiteboard = await Whiteboard.findByPk(id);
    if(!whiteboard) {
        const error = new Error('Pizarrón no encontrado');
        return res.status(404).json({ msg: error.message});
    }

    const classroom = await Classroom.findByPk(whiteboard.classroomId)
    if(classroom.userId.toString() !== req.user.id.toString()) {
        const error = new Error('No tienes los permisos para realizar esta acción');
        return res.status(403).json({ msg: error.message});
    }

    whiteboard.name = req.body.name || whiteboard.name;
    whiteboard.description = req.body.description || whiteboard.description;
    try {
        const savedWhiteboard = await whiteboard.save();
        res.json(savedWhiteboard)
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};

export const deleteWhiteboard = async(req, res) => {
    const { id } = req.params;

    const whiteboard = await Whiteboard.findByPk(id);
    if(!whiteboard) {
        const error = new Error('Pizarrón no encontrado');
        return res.status(404).json({ msg: error.message});
    }

    const classroom = await Classroom.findByPk(whiteboard.classroomId)
    if(classroom.userId.toString() !== req.user.id.toString()) {
        const error = new Error('No tienes los permisos para realizar esta acción');
        return res.status(403).json({ msg: error.message});
    }

    try {
        await whiteboard.destroy();
        res.json({ msg: "Pizarrón Eliminado"});
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};