import { User } from './User.js';
import { Classroom } from './Classroom.js';
import { Whiteboard } from './Whiteboard.js';
import { ClassroomUsers } from './ClassroomUsers.js';

// 1:N
User.hasMany(Classroom);
Classroom.belongsTo(User);

// 1:N
Classroom.hasMany(Whiteboard);
Whiteboard.belongsTo(Classroom);

// N:M Members 
Classroom.belongsToMany(User, { through: 'ClassroomUsers' } );
User.belongsToMany(Classroom, { through: 'ClassroomUsers' } );

export {
    User,
    Classroom,
    Whiteboard,
    ClassroomUsers,
}