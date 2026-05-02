import { Router } from 'express';
import { PatientController } from './patient.controller';
import { authGuard } from '../../guards/auth.guard';
import { roleGuard } from '../../guards/role.guard';
import { validate } from '../../middleware/validate.middleware';
import { param, query } from 'express-validator';

const router = Router();
const patientController = new PatientController();
const patientRoles = roleGuard(['SUPER_ADMIN', 'ADMIN', 'FIELD_MANAGER', 'FIELD_EXECUTIVE', 'RECEPTIONIST']);

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
router.get('/', authGuard, patientRoles, validate([
  query('query').isString().trim().isLength({ min: 2, max: 100 }),
]), patientController.searchPatients);

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
router.get('/:id', authGuard, patientRoles, validate([
  param('id').isUUID(),
]), patientController.getPatient);

export { router as patientRouter };
