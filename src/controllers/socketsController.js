import { User } from "../models/User.js";

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

