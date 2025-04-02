import amqp from "amqplib";
import dotenv from "dotenv";
import { sendEmail } from "../controllers/emailController.js"; 

dotenv.config();

const RABBIT_URL = process.env.RABBIT_URL;
const QUEUE_NAME = "user_created_queue";

export const userEvents = async () => {
    try {
        const connection = await amqp.connect(RABBIT_URL);
          const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log(`Esperando mensajes en ${QUEUE_NAME}...`);
        channel.consume(
            QUEUE_NAME,
            async (msg) => {
                if (msg !== null) {
                    try {
                        const emailData = JSON.parse(msg.content.toString());
                        console.log("Nuevo usuario registrado:", emailData);

                        const emailInfo = {
                            to: emailData.username, 
                            subject: "¡Bienvenido ",
                            text: `Hola,\n\nGracias por registrarte en nuestro servicio. disfruta de la experiencia!\n\n.`,
                            name: emailData.username, 
                            message: "Te damos la bienvenida.",
                        };

                        await sendEmail(emailInfo);
                        console.log(` Correo enviado a ${emailData.username}`);
                        
                        channel.ack(msg);
                    } catch (error) {
                        console.error(" Error al procesar el mensaje:", error.message);
                    }
                }
            },
            { noAck: false }
        );

        connection.on("close", () => {
            console.error("Conexión cerrada, reintentando ");
            setTimeout(userEvents, 5000);
        });
    } catch (error) {
        console.error("Error conectando a RabbitMQ:", error.message);
        console.log("Reintentando ");
        setTimeout(userEvents, 5000);
    }
};

userEvents();
