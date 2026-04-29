import { Router } from 'express';
import { PatientController } from './patient.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const patientController = new PatientController();

router.get('/', authGuard, patientController.searchPatients);
router.get('/:id', authGuard, patientController.getPatient);

export { router as patientRouter };
