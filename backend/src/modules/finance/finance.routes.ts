import { Router } from 'express';
import { FinanceController } from './finance.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const financeController = new FinanceController();

router.use(authGuard);

router.post('/coupons/validate', financeController.validateCoupon);
router.get('/hospital-settlements', financeController.getSettlements);
router.get('/executive-commissions', financeController.getCommissions);
router.post('/membership-payment', financeController.recordPayment);
router.post('/renewals', financeController.processRenewal);
router.get('/dashboard', financeController.getDashboard);

export { router as financeRouter };
