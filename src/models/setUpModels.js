import { User, UserSchema } from "./User.js";
import { Classroom, ClassroomSchema } from "./Classroom.js";
import { Whiteboard, WhiteboardSchema } from "./Whiteboard.js";

const setupModels = (db) => {
    User.init(UserSchema, User.config(db));
    Classroom.init(ClassroomSchema, Classroom.config(db));
    Whiteboard.init(WhiteboardSchema, Whiteboard.config(db));

    Classroom.associate(db.models);
    Whiteboard.associate(db.models);
}

export default setupModels;