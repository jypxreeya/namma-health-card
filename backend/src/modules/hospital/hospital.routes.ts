import { Router } from 'express';
import { HospitalController } from './hospital.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const hospitalController = new HospitalController();

router.use(authGuard);

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
router.get('/patient/search', hospitalController.searchPatient);

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
router.post('/card/validate', hospitalController.validateCard);

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
router.post('/checkin', hospitalController.checkIn);

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
router.post('/service-entry', hospitalController.serviceEntry);

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
router.get('/visit-history', hospitalController.getVisitHistory);

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
router.get('/utilization-dashboard', hospitalController.getDashboard);

export { router as hospitalRouter };
