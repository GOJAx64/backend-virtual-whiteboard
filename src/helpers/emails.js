import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const emailRegistration = async( data ) => {
    const { email, name, token } = data;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"Pizarrones Virtuales" <main@pizarrones.virtuales.com>',
        to: email,
        subject: 'Confirmación de cuenta en: Pizarrones Virtuales',
        text: 'Confirma tu cuenta en Pizarrones Virtuales',
        html: `<p>Hola: ${name}, confirma tu cuenta en Pizarrones Virtuales</p>
               <p>Tu cuenta ya está casi lista, solo accede al siguiente enlace:
                    <a href="${process.env.FRONTEND_URL}/confirm_account/${token}">Confirmar Cuenta</a>
               </p>
               <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>`
    });
};

export const emailForgotPassword = async( data ) => {
    const { email, name, token } = data;
    
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const info = await transport.sendMail({
        from: '"Pizarrones Virtuales" <main@pizarrones.virtuales.com>',
        to: email,
        subject: 'Pizarrones Virtuales Reestablece tu contraseña',
        text: 'Reestablece tu contraseña',
        html: `<p>Hola: ${name}, has solicitado reestablecer tu contraseña</p>
               <p>accede al siguiente enlace para reestablecer tu contraseña:
                    <a href="${process.env.FRONTEND_URL}/forgot_password/${token}">Reestablecer contraseña</a>
               </p>
               <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>`
    });
};