import transporter from "../config/emailConfig.js";
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async ({ to, subject, text, name, message }) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,  
            template: "template", // Opcional si usas plantillas de email
            context: { name, message }
        });

        console.log(`Email enviado a ${to}`);
        return { message: "Email enviado" };
    } catch (error) {
        console.error("Error enviando email:", error);
        throw new Error("Error enviando email: " + error.message);
    }
};


export const sendEmailDirect = async (to, name, message) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: "¡Bienvenido a la plataforma!",
            template: "template",
            context: {
                name,
                message,
            },
        });

        console.log(`Correo enviado con éxito a: ${to}`);
    } catch (error) {
        console.error("Error al enviar correo:", error.message);
    }
};