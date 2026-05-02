import { Router } from 'express';
import { BillingController } from './billing.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const billingController = new BillingController();

router.use(authGuard);

/**
 * @swagger
 * /api/billing/invoice:
 *   post:
 *     summary: Create an invoice for a visit
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 */
router.post('/invoice', billingController.createInvoice);

/**
 * @swagger
 * /api/billing/payment:
 *   post:
 *     summary: Record a payment for an invoice
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 */
router.post('/payment', billingController.recordPayment);

/**
 * @swagger
 * /api/billing/invoice/:visitId:
 *   get:
 *     summary: Get invoice details for a visit
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 */
router.get('/invoice/:visitId', billingController.getInvoice);

export { router as billingRouter };
