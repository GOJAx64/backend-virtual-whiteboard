// import User from '../models/User.js';
import generateId from '../helpers/generateId.js';
import generateJWT from '../helpers/generateJWT.js';
import { emailRegistration, emailForgotPassword } from '../helpers/emails.js';

export const register = async (req, res) => {
    return res.status(404).json({ 
        msg: "Registrando nuevo usuario",
        body: req.body,
    });
};


export const authenticate = async(req, res) => {
    return res.status(404).json({ 
        msg: "Autenticando usuario (LOGIN)",
        body: req.body,
    });
};

export const confirm = async(req, res) => {
    const { token } = req.params;
    return res.status(404).json({ 
        msg: "Confirmando cuenta de usuario",
        token,
    });
};

export const forgotPassword = async(req, res) => {
    const { email } = req.body;
    return res.status(404).json({ 
        msg: "Solicitando token para recuperar contraseña",
        email,
    });
}

export const checkToken = async(req, res) => {
    const { token } = req.params;
    return res.status(404).json({ 
        msg: "Validando token para cambiar contraseña",
        token
    });
}

export const newPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    
    return res.status(404).json({ 
        msg: "Ingreso de nuevo contraseña",
        token,
        password
    });
};

export const profile = async(req, res) => {
    const { user } = req;
    res.json(user);
};