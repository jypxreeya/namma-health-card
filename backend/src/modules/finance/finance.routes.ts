import { Router } from 'express';
import { FinanceController } from './finance.controller';
import { authGuard } from '../../guards/auth.guard';
import { roleGuard } from '../../guards/role.guard';
import { validate } from '../../middleware/validate.middleware';
import { body, query } from 'express-validator';

const router = Router();
const financeController = new FinanceController();

router.use(authGuard, roleGuard(['SUPER_ADMIN', 'ADMIN']));

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
router.post('/coupons/validate', validate([
  body('couponCode').isString().trim().isLength({ min: 1, max: 50 }),
]), financeController.validateCoupon);

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
router.get('/hospital-settlements', validate([
  query('hospitalId').optional().isUUID(),
]), financeController.getSettlements);

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
router.get('/executive-commissions', validate([
  query('executiveId').optional().isUUID(),
]), financeController.getCommissions);

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
router.post('/membership-payment', validate([
  body('patientId').isUUID(),
  body('membershipPlanId').isUUID(),
  body('amount').isFloat({ min: 0.01 }),
  body('paymentReference').optional().isString().trim().isLength({ max: 100 }),
]), financeController.recordPayment);

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
router.post('/renewals', validate([
  body('patientId').isUUID(),
  body('previousExpiry').isISO8601(),
  body('newExpiry').isISO8601(),
  body('renewalType').isString().trim().isLength({ min: 2, max: 50 }),
]), financeController.processRenewal);

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
