import jwt from 'jsonwebtoken';

export const checkJWT = ( token = '' ) => {
    try {
        const { id } = jwt.verify( token, process.env.JWT_SECRET );
        return [ true, id ];
    } catch (error) {
        return [ false, null ];
    }
}