import { Router } from 'express';
import { RegistrationController } from './registration.controller';
import { authGuard } from '../../guards/auth.guard';
import { roleGuard } from '../../guards/role.guard';
import { validate } from '../../middleware/validate.middleware';
import { body } from 'express-validator';

const router = Router();
const registrationController = new RegistrationController();
const registrationRoles = roleGuard(['SUPER_ADMIN', 'ADMIN', 'FIELD_MANAGER', 'FIELD_EXECUTIVE']);

/**
 * @swagger
 * /api/registration/onboard:
 *   post:
 *     summary: Onboard a new patient
 *     tags: [Registration]
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
 *         description: Patient onboarded successfully
 */
router.post('/onboard', authGuard, registrationRoles, validate([
  body('mobile').isString().trim().matches(/^[0-9]{10,15}$/).withMessage('mobile must be 10 to 15 digits'),
  body('fullName').isString().trim().isLength({ min: 2, max: 150 }),
  body('planCode').isString().trim().isLength({ min: 1, max: 50 }),
  body('address.line1').isString().trim().isLength({ min: 3, max: 255 }),
  body('address.city').isString().trim().isLength({ min: 2, max: 100 }),
  body('address.state').isString().trim().isLength({ min: 2, max: 100 }),
  body('address.postalCode').isString().trim().isLength({ min: 3, max: 20 }),
  body('consent.granted').isBoolean(),
  body('consent.version').optional().isString().trim().isLength({ max: 50 }),
  body('leadId').optional().isUUID(),
  body('familyMembers').optional().isArray({ max: 20 }),
]), registrationController.onboardPatient);

/**
 * @swagger
 * /api/registration/drafts:
 *   post:
 *     summary: Save a registration draft
 *     tags: [Registration]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Draft saved
 *   get:
 *     summary: Get all registration drafts for the current user
 *     tags: [Registration]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of drafts
 */
router.post('/drafts', authGuard, registrationRoles, validate([
  body('mobile').isString().trim().matches(/^[0-9]{10,15}$/).withMessage('mobile must be 10 to 15 digits'),
  body('fullName').isString().trim().isLength({ min: 2, max: 150 }),
  body('leadId').optional().isUUID(),
]), registrationController.saveDraft);
router.get('/drafts', authGuard, registrationRoles, registrationController.getDrafts);

export { router as registrationRouter };
