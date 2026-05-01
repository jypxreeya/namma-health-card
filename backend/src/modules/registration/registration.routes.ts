import { Router } from 'express';
import { RegistrationController } from './registration.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const registrationController = new RegistrationController();

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
router.post('/onboard', authGuard, registrationController.onboardPatient);

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
router.post('/drafts', authGuard, registrationController.saveDraft);
router.get('/drafts', authGuard, registrationController.getDrafts);

export { router as registrationRouter };
