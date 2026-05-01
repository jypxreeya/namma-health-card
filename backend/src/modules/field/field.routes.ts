import { Router } from 'express';
import { FieldController } from './field.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const fieldController = new FieldController();

/**
 * @swagger
 * /api/field/leads:
 *   post:
 *     summary: Create a new lead
 *     tags: [Field]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Lead created
 *   get:
 *     summary: Get all leads for the field executive
 *     tags: [Field]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of leads
 */
router.post('/leads', authGuard, fieldController.createLead);
router.get('/leads', authGuard, fieldController.getLeads);

/**
 * @swagger
 * /api/field/visits:
 *   post:
 *     summary: Log a patient visit
 *     tags: [Field]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Visit logged
 */
router.post('/visits', authGuard, fieldController.logVisit);

/**
 * @swagger
 * /api/field/dashboard:
 *   get:
 *     summary: Get field executive dashboard stats
 *     tags: [Field]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
router.get('/dashboard', authGuard, fieldController.getDashboard);

export { router as fieldRouter };
