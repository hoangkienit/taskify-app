import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

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
import hpp from 'hpp';
import cors from 'cors';

const app = express();
const port = process.env.PORT as string;

i18next.use(middleware.LanguageDetector).init({
    fallbackLng: 'en',
    resources: {
        en: { translation: translationEn },
        vi: { translation: translationVi },
    },
});

app.use(middleware.handle(i18next));

connectDb();

app.use(express.json());

//===========SECURITY MIDDLEWARE===========
app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); // Sanitize data against NoSQL injection
app.use(hpp()); // Protect against HTTP Parameter Pollution

//===========MIDDLEWARES===========
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

//===========CORS===========
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin as string)) {
        res.setHeader('Access-Control-Allow-Origin', origin as string);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Language');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello from TypeScript backend!');
});

app.use('/api/v1/auth', AuthRoute);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});