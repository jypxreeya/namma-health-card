import { Router } from 'express';
import { PatientController } from './patient.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const patientController = new PatientController();

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Search for patients
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of patients
 */
router.get('/', authGuard, patientController.searchPatients);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get patient details by ID
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient details
 */
router.get('/:id', authGuard, patientController.getPatient);

export { router as patientRouter };
