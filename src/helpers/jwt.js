import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const checkJWT = ( token = '' ) => {
    try {
        const { id } = jwt.verify( token, process.env.JWT_SECRET );
        return [ true, id ];
    } catch (error) {
        return [ false, null ];
    }
}