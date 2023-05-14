import { User } from './User.js';
import { Classroom } from './Classroom.js';
import { Whiteboard } from './Whiteboard.js';

Classroom.hasOne(User);
Whiteboard.hasOne(Classroom);

export {
    User,
    Classroom,
    Whiteboard,
}