import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.middleware';
import { prisma } from './config/prisma';
import { setupSwagger } from './config/swagger';

// Import Routers
import { authRouter } from './modules/auth/auth.routes';
import { fieldRouter } from './modules/field/field.routes';
import { patientRouter } from './modules/patients/patient.routes';
import { registrationRouter } from './modules/registration/registration.routes';
import { membershipRouter } from './modules/memberships/membership.routes';
import { cardRouter } from './modules/cards/card.routes';
import { hospitalRouter } from './modules/hospital/hospital.routes';
import { financeRouter } from './modules/finance/finance.routes';
import { customerRouter } from './modules/customer/customer.routes';
import { analyticsRouter } from './modules/analytics/analytics.routes';

import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter for login/auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 requests per 15 minutes
  message: { message: 'Too many login attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Security & Parsing Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// Setup Swagger
setupSwagger(app);

// API Routes
app.use('/api/auth', authLimiter, authRouter);
app.use('/api/field', fieldRouter);
app.use('/api/patients', patientRouter);
app.use('/api/registration', registrationRouter);
app.use('/api/memberships', membershipRouter);
app.use('/api/cards', cardRouter);
app.use('/api/hospital', hospitalRouter);
app.use('/api/finance', financeRouter);
app.use('/api/customer', customerRouter);
app.use('/api/admin/analytics', analyticsRouter);

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', database: 'Disconnected' });
  }
});

// Global Error Handler (must be last)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Namma Health Card API is running on port ${PORT}`);
});
