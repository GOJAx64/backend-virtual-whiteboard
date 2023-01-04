import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const User = db.define('user', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    },
    confirmed: {
        type: DataTypes.BOOLEAN
    },
});
//TODO Encrypt password before to save the password

//TODO Check encrypted passsword 
export const checkPassword = ( passwordForm, passwordUser ) => {
    return passwordForm === passwordUser ?  true : false ;
}

export default User;