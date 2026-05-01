import { Router } from 'express';
import { FinanceController } from './finance.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const financeController = new FinanceController();

router.use(authGuard);

/**
 * @swagger
 * /api/finance/coupons/validate:
 *   post:
 *     summary: Validate a coupon code
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Coupon validity status
 */
router.post('/coupons/validate', financeController.validateCoupon);

/**
 * @swagger
 * /api/finance/hospital-settlements:
 *   get:
 *     summary: Get hospital settlement records
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of settlements
 */
router.get('/hospital-settlements', financeController.getSettlements);

/**
 * @swagger
 * /api/finance/executive-commissions:
 *   get:
 *     summary: Get field executive commission records
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of commissions
 */
router.get('/executive-commissions', financeController.getCommissions);

/**
 * @swagger
 * /api/finance/membership-payment:
 *   post:
 *     summary: Record a membership payment
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment recorded
 */
router.post('/membership-payment', financeController.recordPayment);

/**
 * @swagger
 * /api/finance/renewals:
 *   post:
 *     summary: Process a membership renewal
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Renewal processed
 */
router.post('/renewals', financeController.processRenewal);

/**
 * @swagger
 * /api/finance/dashboard:
 *   get:
 *     summary: Get finance dashboard summary
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary
 */
router.get('/dashboard', financeController.getDashboard);

export { router as financeRouter };
