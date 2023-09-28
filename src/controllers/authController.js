import { User } from '../models/User.js';
import generateId from '../helpers/generateId.js';
import generateJWT from '../helpers/generateJWT.js';
import { emailForgotPassword, emailRegistration } from '../helpers/emails.js';

export const register = async (req, res) => {
    const { body } = req;

    try {
        const userExists = await User.findOne({ where:{ email: body.email } });
    
        if(userExists) {
            const error = new Error("Ya existe un usuario registrado con ese email");
            return res.status(400).json({ msg: error.message });
        }

        const user = new User(body);
        user.token = generateId();
        await user.save();

        emailRegistration({
            email: user.email,
            name: user.name,
            token: user.token,
        })

        res.json({ msg: 'Enviamos un correo para confirmar tu cuenta'});    
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};

export const authenticate = async(req, res) => {
    const {email, password} = req.body;

    //User exists
    const user = await User.findOne({ where:{ email } });
    
    if(!user) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    //User confirmed
    if(!user.confirmed) {
        const error = new Error('La cuenta de usuario no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    }

    //verify password 
    if( user.checkPassword(password) ) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWT(user.id),
        })
    } else {
        const error = new Error('Contraseña Incorrecta');
        return res.status(403).json({ msg: error.message });
    }
};

export const confirm = async(req, res) => {
    const { token } = req.params;
    
    try {
        const userForConfirm = await User.findOne({ where:{ token } });
    
        if(!userForConfirm) {
            const error = new Error('Token no válido');
            return res.status(403).json({ msg: error.message });
        }

        userForConfirm.confirmed = true;
        userForConfirm.token= null;
        await userForConfirm.save();
        res.json({ msg: 'Usuario cofirmado exitosamente' });
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};

export const forgotPassword = async(req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ where:{ email } });
        
        if(!user) {
            const error = new Error('No existe el usuario');
            return res.status(404).json({ msg: error.message });
        }

        //User confirmed
        if(!user.confirmed) {
            const error = new Error('La cuenta de usuario no ha sido confirmada');
            return res.status(403).json({ msg: error.message });
        }

        user.token = generateId();
        await user.save();
        
        emailForgotPassword({
            email: user.email,
            name: user.name,
            token: user.token, 
        });

        res.json( {msg: "Enviamos un correo con instrucciones"} );
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
}

export const checkToken = async(req, res) => {
    const { token } = req.params;
    
    try {
        const validToken = await User.findOne({ where:{ token } });
        
        if(validToken) {
            res.json({ msg: 'El usuario existe y el token es válido' });
        } else {
            const error = new Error('Token no válido');
            return res.status(404).json({ msg: error.message });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
}

export const newPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({ where:{ token } });
        if(user) {
            user.password = user.hashPassword(password);
            user.token = null;
            await user.save();
            res.json({ msg: "Contraseña modificada correctamente"});
        } else {
            const error = new Error('Token no válido');
            return res.status(404).json({ msg: error.message });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};

export const profile = async(req, res) => {
    const { user } = req;
    res.json(user);
};

export const updateProfileName = async(req, res) => {
    const { name } = req.body;
    
    try {
        const user = await User.findOne({ where:{ id: req.user.id } });
        
        if(!user) {
            const error = new Error('No existe el usuario');
            return res.status(404).json({ msg: error.message });
        }
        user.name = name;
        await user.save();
        req.user.name = name;
        res.json({ msg: 'Usuario modificado' });
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};