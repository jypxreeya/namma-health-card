import { Router } from 'express';
import { FieldController } from './field.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const fieldController = new FieldController();

router.post('/leads', authGuard, fieldController.createLead);
router.get('/leads', authGuard, fieldController.getLeads);
router.post('/visits', authGuard, fieldController.logVisit);
router.get('/dashboard', authGuard, fieldController.getDashboard);

export { router as fieldRouter };
