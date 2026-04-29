import { Router } from 'express';
import { CustomerController } from './customer.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const customerController = new CustomerController();

// Public auth routes
router.post('/login', customerController.login);
router.post('/otp/verify', customerController.verifyOtp);

// Protected routes
router.use(authGuard);

router.get('/dashboard', customerController.getDashboard);
router.get('/profile', customerController.getProfile);
router.get('/card', customerController.getCard);
router.get('/history', customerController.getHistory);
router.post('/support/tickets', customerController.createTicket);
router.post('/feedback', customerController.submitFeedback);

export { router as customerRouter };
