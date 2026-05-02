import { Router } from 'express';
import { CustomerController } from './customer.controller';
import { authGuard } from '../../guards/auth.guard';
import { roleGuard } from '../../guards/role.guard';
import { validate } from '../../middleware/validate.middleware';
import { body } from 'express-validator';

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
router.post('/login', validate([
  body('mobile').isString().trim().matches(/^[0-9]{10,15}$/).withMessage('mobile must be 10 to 15 digits'),
]), customerController.login);

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
router.post('/otp/verify', validate([
  body('mobile').isString().trim().matches(/^[0-9]{10,15}$/).withMessage('mobile must be 10 to 15 digits'),
  body('otp').isString().trim().matches(/^[0-9]{6}$/).withMessage('otp must be 6 digits'),
  body('otpReference').isString().trim().isLength({ min: 4, max: 100 }),
]), customerController.verifyOtp);

// Protected routes
router.use(authGuard, roleGuard(['CUSTOMER']));

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
router.post('/support/tickets', validate([
  body('ticketType').isString().trim().isLength({ min: 2, max: 100 }),
  body('subject').isString().trim().isLength({ min: 2, max: 255 }),
  body('description').isString().trim().isLength({ min: 5, max: 2000 }),
  body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
]), customerController.createTicket);

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
router.post('/feedback', validate([
  body('visitId').optional().isUUID(),
  body('hospitalId').optional().isUUID(),
  body('rating').isInt({ min: 1, max: 5 }),
  body('text').optional().isString().trim().isLength({ max: 2000 }),
]), customerController.submitFeedback);

export { router as customerRouter };
