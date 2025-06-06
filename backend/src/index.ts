import { config } from 'dotenv';
config();
import express from 'express';
import appScriptRoutes from './routes/appScriptRoutes';
import inquiryRoutes from './routes/inquiryRoutes';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN, // Set this to your frontend URL or '*' for all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/submit', appScriptRoutes);
app.use('/inquiry', inquiryRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});