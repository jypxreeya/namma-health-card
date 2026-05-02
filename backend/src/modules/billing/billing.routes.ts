import { Router } from 'express';
import { BillingController } from './billing.controller';
import { authGuard } from '../../guards/auth.guard';
import { roleGuard } from '../../guards/role.guard';
import { validate } from '../../middleware/validate.middleware';
import { body, param } from 'express-validator';

const router = Router();
const billingController = new BillingController();

router.use(authGuard, roleGuard(['SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST']));

/**
 * @swagger
 * /api/billing/invoice:
 *   post:
 *     summary: Create an invoice for a visit
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 */
router.post('/invoice', validate([
  body('visitId').isUUID(),
  body('totalAmount').isFloat({ min: 0 }),
  body('discountAmount').isFloat({ min: 0 }),
]), billingController.createInvoice);

/**
 * @swagger
 * /api/billing/payment:
 *   post:
 *     summary: Record a payment for an invoice
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 */
router.post('/payment', validate([
  body('invoiceId').isUUID(),
  body('amount').isFloat({ min: 0.01 }),
  body('paymentMethod').isIn(['CASH', 'CARD', 'UPI', 'NET_BANKING', 'INSURANCE', 'OTHER']),
  body('transactionId').optional().isString().trim().isLength({ max: 100 }),
]), billingController.recordPayment);

/**
 * @swagger
 * /api/billing/invoice/:visitId:
 *   get:
 *     summary: Get invoice details for a visit
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 */
router.get('/invoice/:visitId', validate([
  param('visitId').isUUID(),
]), billingController.getInvoice);

export { router as billingRouter };
