import { Router } from 'express';
import { HospitalController } from './hospital.controller';
import { authGuard } from '../../guards/auth.guard';
import { roleGuard } from '../../guards/role.guard';
import { validate } from '../../middleware/validate.middleware';
import { body, query } from 'express-validator';

const router = Router();
const hospitalController = new HospitalController();

router.use(authGuard, roleGuard(['SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST']));

/**
 * @swagger
 * /api/hospital/patient/search:
 *   get:
 *     summary: Search for a patient by phone or ID
 *     tags: [Hospital]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patient data
 */
router.get('/patient/search', validate([
  query('q').isString().trim().isLength({ min: 2, max: 100 }),
]), hospitalController.searchPatient);

/**
 * @swagger
 * /api/hospital/card/validate:
 *   post:
 *     summary: Validate a health card
 *     tags: [Hospital]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Card validation status
 */
router.post('/card/validate', validate([
  body('patientId').isUUID(),
]), hospitalController.validateCard);

/**
 * @swagger
 * /api/hospital/checkin:
 *   post:
 *     summary: Check-in a patient for a visit
 *     tags: [Hospital]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Check-in successful
 */
router.post('/checkin', validate([
  body('patientId').isUUID(),
  body('beneficiaryId').optional().isUUID(),
  body('hospitalId').optional().isUUID(),
  body('branchId').optional().isUUID(),
  body('receptionUserId').optional().isUUID(),
  body('departmentId').optional().isUUID(),
  body('doctorId').optional().isUUID(),
]), hospitalController.checkIn);

/**
 * @swagger
 * /api/hospital/service-entry:
 *   post:
 *     summary: Log a service provided to a patient
 *     tags: [Hospital]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Service entry logged
 */
router.post('/service-entry', validate([
  body('visitId').isUUID(),
  body('serviceCategory').isIn(['OPD', 'DIAGNOSTIC', 'SPECIALIST', 'PHARMACY', 'EMERGENCY']),
  body('serviceName').isString().trim().isLength({ min: 2, max: 150 }),
  body('benefitUsed').isBoolean(),
  body('discountGiven').isFloat({ min: 0 }),
  body('revenueValue').optional().isFloat({ min: 0 }),
  body('notes').optional().isString().trim().isLength({ max: 1000 }),
]), hospitalController.serviceEntry);

/**
 * @swagger
 * /api/hospital/visit-history:
 *   get:
 *     summary: Get visit history for the hospital
 *     tags: [Hospital]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of visits
 */
router.get('/visit-history', validate([
  query('patientId').isUUID(),
]), hospitalController.getVisitHistory);

/**
 * @swagger
 * /api/hospital/utilization-dashboard:
 *   get:
 *     summary: Get hospital utilization dashboard data
 *     tags: [Hospital]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get('/utilization-dashboard', validate([
  query('hospitalId').optional().isUUID(),
]), hospitalController.getDashboard);

/**
 * @swagger
 * /api/hospital/departments:
 *   get:
 *     summary: Get list of departments in a branch
 *     tags: [Hospital]
 *     security:
 *       - bearerAuth: []
 */
router.get('/departments', validate([
  query('branchId').optional().isUUID(),
]), hospitalController.getDepartments);

/**
 * @swagger
 * /api/hospital/doctors:
 *   get:
 *     summary: Get list of doctors in a branch/department
 *     tags: [Hospital]
 *     security:
 *       - bearerAuth: []
 */
router.get('/doctors', validate([
  query('branchId').optional().isUUID(),
  query('departmentId').optional().isUUID(),
]), hospitalController.getDoctors);

export { router as hospitalRouter };
