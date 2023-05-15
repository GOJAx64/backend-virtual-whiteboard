import { User } from './User.js';
import { Classroom } from './Classroom.js';
import { Whiteboard } from './Whiteboard.js';
import { ClassroomUsers } from './ClassroomUsers.js';

// 1:M
User.hasMany(Classroom);
Classroom.belongsTo(User);

// 1:M
Classroom.hasMany(Whiteboard);
Whiteboard.belongsTo(Classroom);

// M:N Members 
Classroom.belongsToMany(User, { through: 'ClassroomUsers' } );
User.belongsToMany(Classroom, { through: 'ClassroomUsers' } );

export {
    User,
    Classroom,
    Whiteboard,
    ClassroomUsers,
}