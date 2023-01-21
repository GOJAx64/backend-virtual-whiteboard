import { User, UserSchema } from "./User.js";

function setupModels(db) {
    User.init(UserSchema, User.config(db));
}

export default setupModels;