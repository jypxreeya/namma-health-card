import { Router } from 'express';
import { AuthController } from './auth.controller';

import { authGuard } from '../../guards/auth.guard';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/field/login', authController.fieldLogin);
router.post('/field/otp/verify', authController.verifyFieldOtp);
router.get('/menus', authGuard, authController.getMenus);

export { router as authRouter };
