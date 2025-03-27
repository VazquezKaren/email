import bodyParser from "body-parser";
import express from "express";
import { userEvents } from './services/rabbitServiceEvent.js';


const app = express();

app.use(bodyParser.json());
//app.use('/api/email', emailRoutes);

userEvents().catch((err) =>{
    console.error('Error iniciando el consumidor de eventos:', err);
});
 
export default app;