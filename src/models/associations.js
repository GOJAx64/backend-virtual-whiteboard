import { User } from './User.js';
import { Classroom } from './Classroom.js';
import { ClassroomUsers } from './ClassroomUsers.js';
import { Activity } from './Activity.js';

// 1:N
User.hasMany(Classroom);
Classroom.belongsTo(User);

// 1:N
Classroom.hasMany(Activity);
Activity.belongsTo(Classroom);

// N:M Members 
Classroom.belongsToMany(User, { through: 'ClassroomUsers' } );
User.belongsToMany(Classroom, { through: 'ClassroomUsers' } );

export {
    User,
    Classroom,
    Activity,
    ClassroomUsers,
}