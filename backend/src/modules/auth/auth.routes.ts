import { Router } from 'express';
import { AuthController } from './auth.controller';

import { authGuard } from '../../guards/auth.guard';
import { validate } from '../../middleware/validate.middleware';
import { body } from 'express-validator';

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validate([
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 8, max: 128 }),
]), authController.login);

/**
 * @swagger
 * /api/auth/field/login:
 *   post:
 *     summary: Field executive login (initiates OTP)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent
 */
router.post('/field/login', validate([
  body('mobile').isString().trim().matches(/^[0-9]{10,15}$/).withMessage('mobile must be 10 to 15 digits'),
]), authController.fieldLogin);

/**
 * @swagger
 * /api/auth/field/otp/verify:
 *   post:
 *     summary: Verify Field executive OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - otp
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified, login successful
 */
router.post('/field/otp/verify', validate([
  body('mobile').isString().trim().matches(/^[0-9]{10,15}$/).withMessage('mobile must be 10 to 15 digits'),
  body('otp').isString().trim().matches(/^[0-9]{6}$/).withMessage('otp must be 6 digits'),
]), authController.verifyFieldOtp);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token using refresh token cookie
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Invalid refresh token
 */
router.post('/refresh', authController.refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user and invalidate session
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post('/logout', authController.logout);

/**
 * @swagger
 * /api/auth/menus:
 *   get:
 *     summary: Get menus based on user role
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of menus
 */
router.get('/menus', authGuard, authController.getMenus);

export { router as authRouter };
