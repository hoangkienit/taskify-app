import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT as string;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from TypeScript backend!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
