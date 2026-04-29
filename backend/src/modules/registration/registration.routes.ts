import { Router } from 'express';
import { RegistrationController } from './registration.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const registrationController = new RegistrationController();

router.post('/onboard', authGuard, registrationController.onboardPatient);

export { router as registrationRouter };
