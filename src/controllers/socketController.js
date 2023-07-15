import { Op } from"sequelize";
import { Message } from '../models/Message.js';
import { User } from '../models/User.js';

export const markUserAsOnline = async(id) => {
    const user = await User.findByPk(id);
    user.online = true;
    await user.save();

    return user;
};

export const markUserAsOffline = async(id) => {
    const user = await User.findByPk(id);
    user.online = false;
    await user.save();

    return user;
};

export const saveMessage = async(payload) => {
    try {
        const message = new Message(payload);
        await message.save();
        return message;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const getMessages = async(req, res) => {
    const { id } = req.params;
    const { from, to } = req.body;

    const messages = await Message.findAll({ 
        where: { 
            classroomId: id,
            [Op.or]: [
                { to: to, from: from },
                { from: to, to: from } 
            ]
        },
        order: [
            ['createdAt', 'ASC']
        ],
        limit: 500
    });
    
    res.json(messages);
};