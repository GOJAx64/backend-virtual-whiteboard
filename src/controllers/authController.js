import { User } from '../models/User.js';
import generateId from '../helpers/generateId.js';
import generateJWT from '../helpers/generateJWT.js';
import hashPassword from '../helpers/hashPassword.js';
import checkPassword from '../helpers/checkPassword.js';
import { emailForgotPassword, emailRegistration } from '../helpers/emails.js';

import { spawn } from 'child_process';


export const register = async (req, res) => {
    // const pythonProcess = spawn('python', ['main.py'])
    // let dataToSend;

    // pythonProcess.stdout.on('data', (data) => {
    //     console.log('Ejecutando python')
    // });

    // pythonProcess.on('close', (code) => {
    //     console.log(`exit with code ${code}`)
    //     // res.send(dataToSend)
    // });

    const { body } = req;

    try {
        const userExists = await User.findOne({ where: { email: body.email } });
    
        if(userExists) {
            const error = new Error("Ya existe un usuario registrado con ese email");
            return res.status(400).json({ msg: error.message });
        }

        const user = new User(body);
        user.id = generateId();
        user.token = generateId();
        user.confirmed = false;
        user.password = await hashPassword(user.password);
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
    const user = await User.findOne({ where: { email: email } });
    
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
    if( await checkPassword( password, user.password )) {
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
        const userForConfirm = await User.findOne({ where: { token: token } });
    
        if(!userForConfirm) {
            const error = new Error('Token no válido');
            return res.status(403).json({ msg: error.message });
        }

        userForConfirm.confirmed = true;
        userForConfirm.token= "";
        await userForConfirm.save();
        res.json({ msg: 'Usuario cofirmado exitosamente' });
    } catch (error) {
        return res.status(500).json({ msg: error.message + " - Contacte al administrador" });
    }
};

export const forgotPassword = async(req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ where: { email: email } });
        
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
        const validToken = await User.findOne({ where: { token: token } });
        
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
        const user = await User.findOne({ where: { token: token } });
        if(user) {
            user.password = await hashPassword(password);
            user.token = '';
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