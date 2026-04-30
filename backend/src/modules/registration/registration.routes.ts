import { Router } from 'express';
import { RegistrationController } from './registration.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const registrationController = new RegistrationController();

router.post('/onboard', authGuard, registrationController.onboardPatient);
router.post('/drafts', authGuard, registrationController.saveDraft);
router.get('/drafts', authGuard, registrationController.getDrafts);

export { router as registrationRouter };
