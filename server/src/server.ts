import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import AuthRoute from './routes/auth.route';
import connectDb from './config/mongo';

const app = express();
const port = process.env.PORT as string;

connectDb();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello from TypeScript backend!');
});
app.use('/api/v1/auth', AuthRoute);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
