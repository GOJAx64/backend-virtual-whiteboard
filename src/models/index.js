import { Whiteboard, WhiteboardSchema } from "./Whiteboard.js";
import { User, UserSchema } from "./User.js";

const setupModels = (db) => {
    User.init(UserSchema, User.config(db));
    Whiteboard.init(WhiteboardSchema, Whiteboard.config(db));

    Whiteboard.associate(db.models);
}

export default setupModels;