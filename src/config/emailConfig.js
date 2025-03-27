import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import hbs from 'nodemailer-express-handlebars';
import nodemailerExpressHandlebars from 'nodemailer-express-handlebars';
import path from "path";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const handlebarOptions = {
    viewEngine: {
        extName: ".handlebars", 
        partialsDir: path.resolve("src/views"),
        defaultLayout: false, 
    },
    viewPath: path.resolve("src/views"), 
    extName: ".handlebars", 

};
transporter.use('compile', nodemailerExpressHandlebars(handlebarOptions));


export default transporter;
