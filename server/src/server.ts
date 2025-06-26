import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Import routes
import UserRoute from './routes/user.route';
import AuthRoute from './routes/auth.route';


import connectDb from './config/mongo';
import middleware from 'i18next-http-middleware';
import translationEn from './locales/en.json';
import translationVi from './locales/vi.json';
import i18next from 'i18next';
import errorHandler from './middlewares/error.middleware';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import requestLogger from './middlewares/request.middleware';
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT as string;

connectDb();
app.use(express.json());

//===========CORS===========
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

//===========MIDDLEWARES===========
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

i18next.use(middleware.LanguageDetector).init({
    fallbackLng: 'en',
    resources: {
        en: { translation: translationEn },
        vi: { translation: translationVi },
    },
});

app.use(middleware.handle(i18next));
app.use(requestLogger); // Log requests

//===========SECURITY MIDDLEWARE===========
app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); // Sanitize data against NoSQL injection



// Routes
app.get('/', (req, res) => {
    res.send('Hello from TypeScript backend!');
});

app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/user', UserRoute);

// Error handling
app.use(errorHandler);

//===========GLOBAL HANDLERS FOR UNEXPECTED ERRORS ===========
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});