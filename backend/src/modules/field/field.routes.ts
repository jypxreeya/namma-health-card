import { Router } from 'express';
import { FieldController } from './field.controller';
import { authGuard } from '../../guards/auth.guard';
import { roleGuard } from '../../guards/role.guard';
import { validate } from '../../middleware/validate.middleware';
import { body } from 'express-validator';

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
const fieldRoles = roleGuard(['SUPER_ADMIN', 'ADMIN', 'FIELD_MANAGER', 'FIELD_EXECUTIVE']);

router.post('/leads', authGuard, fieldRoles, validate([
  body('mobile').isString().trim().matches(/^[0-9]{10,15}$/).withMessage('mobile must be 10 to 15 digits'),
  body('fullName').isString().trim().isLength({ min: 2, max: 150 }),
  body('area').optional().isString().trim().isLength({ max: 100 }),
]), fieldController.createLead);
router.get('/leads', authGuard, fieldRoles, fieldController.getLeads);

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
router.post('/visits', authGuard, fieldRoles, validate([
  body('leadId').isUUID(),
  body('visitType').isIn(['IN_PERSON', 'CALL', 'FOLLOW_UP']),
  body('geoLat').optional().isFloat({ min: -90, max: 90 }),
  body('geoLong').optional().isFloat({ min: -180, max: 180 }),
  body('notes').optional().isString().trim().isLength({ max: 1000 }),
]), fieldController.logVisit);

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
router.get('/dashboard', authGuard, fieldRoles, fieldController.getDashboard);

export { router as fieldRouter };
