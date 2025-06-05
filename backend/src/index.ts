import { config } from 'dotenv';
config();
import express from 'express';
import appScriptRoutes from './routes/appScriptRoutes.js';

const app = express();

app.use(express.json());

app.use('/submit', appScriptRoutes)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});