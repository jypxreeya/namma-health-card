import { Router } from 'express';
import { HospitalController } from './hospital.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const hospitalController = new HospitalController();

router.use(authGuard);

router.get('/patient/search', hospitalController.searchPatient);
router.post('/card/validate', hospitalController.validateCard);
router.post('/checkin', hospitalController.checkIn);
router.post('/service-entry', hospitalController.serviceEntry);
router.get('/visit-history', hospitalController.getVisitHistory);
router.get('/utilization-dashboard', hospitalController.getDashboard);

export { router as hospitalRouter };
