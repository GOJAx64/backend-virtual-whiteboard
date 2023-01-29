import { Whiteboard, WhiteboardSchema } from "./Whiteboard.js";
import { User, UserSchema } from "./User.js";
import { Classroom, ClassroomSchema } from "./Classroom.js";

const setupModels = (db) => {
    User.init(UserSchema, User.config(db));
    Whiteboard.init(WhiteboardSchema, Whiteboard.config(db));
    Classroom.init(ClassroomSchema, Classroom.config(db));

    Classroom.associate(db.models);
    Whiteboard.associate(db.models);
}

export default setupModels;