import { where } from "sequelize";
import { Classroom } from "../models/Classroom.js";
import { ClassroomUsers } from "../models/ClassroomUsers.js";
import { User } from "../models/User.js";

export const getClassrooms = async(req, res) => {
    const classrooms = await Classroom.findAll({ where: { userId: req.user.id } });
    res.json(classrooms);
};

export const newClassroom = async(req, res) => {
    const classroom = new Classroom(req.body);
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
        const error = new Error('404 - Aula no encontrada');
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

export const searchUser = async(req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ where:{ email } });

    if(!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ msg: error.message });
    };

    res.json({
        email: user.email,
        id: user.id,
        name: user.name,
    });
};

export const addMember = async(req, res) => {
    const { email } = req.body;
    
    const classroom = await Classroom.findByPk(req.params.id);
    
    if(!classroom) {
        const error = new Error("Aula no encontrada");
        return res.status(404).json({ msg: error.message });
    };

    if(classroom.userId.toString() !== req.user.id.toString()) {
        const error = new Error('No tienes permisos para realizar esta acción');
        return res.status(401).json({ msg: error.message });
    };

    const user = await User.findOne({ where:{ email } });

    if(!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ msg: error.message });
    };

    if(classroom.userId.toString() === user.id.toString()) {
        const error = new Error('No puedes añadirte a ti mismo');
        return res.status(401).json({ msg: error.message });
    };

    
    const isUserRegistered = await ClassroomUsers.findOne({where: { 
                                classroomId: classroom.id,
                                userId: user.id
                            }});

    if(isUserRegistered) {
        const error = new Error('El usuario ya ha sido registrado en esta aula');
        return res.status(401).json({ msg: error.message });
    };

    const classroomUser = new ClassroomUsers({
        classroomId: classroom.id,
        userId: user.id,
    });
    
    try {
        await classroomUser.save();
        res.json({ msg: 'Usuario agregado correctamente al aula' });
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};

export const deleteMember = async(req, res) => {

};