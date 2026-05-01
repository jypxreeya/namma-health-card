import { Router } from 'express';
import { CustomerController } from './customer.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const customerController = new CustomerController();

// Public auth routes
/**
 * @swagger
 * /api/customer/login:
 *   post:
 *     summary: Customer login (initiates OTP)
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: OTP sent
 */
router.post('/login', customerController.login);

/**
 * @swagger
 * /api/customer/otp/verify:
 *   post:
 *     summary: Verify customer OTP
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: OTP verified, login successful
 */
router.post('/otp/verify', customerController.verifyOtp);

// Protected routes
router.use(authGuard);

/**
 * @swagger
 * /api/customer/dashboard:
 *   get:
 *     summary: Get customer dashboard data
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get('/dashboard', customerController.getDashboard);

/**
 * @swagger
 * /api/customer/profile:
 *   get:
 *     summary: Get customer profile
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data
 */
router.get('/profile', customerController.getProfile);

/**
 * @swagger
 * /api/customer/card:
 *   get:
 *     summary: Get customer health card details
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Card data
 */
router.get('/card', customerController.getCard);

/**
 * @swagger
 * /api/customer/history:
 *   get:
 *     summary: Get customer visit history
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: History data
 */
router.get('/history', customerController.getHistory);

/**
 * @swagger
 * /api/customer/support/tickets:
 *   post:
 *     summary: Create a support ticket
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Ticket created
 */
router.post('/support/tickets', customerController.createTicket);

/**
 * @swagger
 * /api/customer/feedback:
 *   post:
 *     summary: Submit feedback
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Feedback submitted
 */
router.post('/feedback', customerController.submitFeedback);

export { router as customerRouter };
