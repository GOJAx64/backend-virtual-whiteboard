import generateId from "../helpers/generateId.js";
import { Classroom } from "../models/Classroom.js";

export const getClassrooms = async(req, res) => {
    const classrooms = await Classroom.findAll({ where: { userId: req.user.id } });
    res.json(classrooms);
};

export const newClassroom = async(req, res) => {
    const classroom = new Classroom(req.body);
    classroom.id = generateId();
    classroom.userId = req.user.id;

    try {
        const savedClassroom = await classroom.save();
        res.json(savedClassroom);
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};

export const getClassroom = async(req, res) => {
    const { id } = req.params;
    const classroom = await Classroom.findByPk(id);
    
    if(!classroom) {
        const error = new Error('404 - No encontrado');
        return res.status(404).json({ msg: error.message });
    }

    if(classroom.userId.toString() !== req.user.id.toString()) {
        const error = new Error('401 - No tienes permisos para ver este contenido');
        return res.status(401).json({ msg: error.message });
    }

    // const whiteboards = await Whiteboard.findAll({ where: { classroomId: classroom.id } });
    
    res.json(classroom);
};

export const editClassroom = async(req, res) => {
    const { id } = req.params;
    const classroom = await Classroom.findByPk(id);
    
    if(!classroom) {
        const error = new Error('404 - No encontrado');
        return res.status(404).json({ msg: error.message });
    }

    if(classroom.userId.toString() !== req.user.id.toString()) {
        const error = new Error('401 - No tienes permisos para ver este contenido');
        return res.status(401).json({ msg: error.message });
    }

    classroom.name = req.body.name || classroom.name;
    classroom.description = req.body.description || classroom.description;
    classroom.summary = req.body.summary;
    
    try {
        const savedClassroom = await classroom.save();
        res.json(savedClassroom);
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};

export const deleteClassroom = async(req, res) => {
    const { id } = req.params;
    const classroom = await Classroom.findByPk(id);
    
    if(!classroom) {
        const error = new Error('404 - No encontrado');
        return res.status(404).json({ msg: error.message });
    }

    if(classroom.userId.toString() !== req.user.id.toString()) {
        const error = new Error('401 - No tienes permisos para ver este contenido');
        return res.status(401).json({ msg: error.message });
    }

    try {
        await classroom.destroy();
        res.json({ msg: "Aula Eliminada"});
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};

export const addMember = async(req, res) => {

};

export const deleteMember = async(req, res) => {

};