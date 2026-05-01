import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const analyticsController = new AnalyticsController();

router.use(authGuard);

/**
 * @swagger
 * /api/admin/analytics/dashboard/overview:
 *   get:
 *     summary: Get overall dashboard overview
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overview data
 */
router.get('/dashboard/overview', analyticsController.getOverview);

/**
 * @swagger
 * /api/admin/analytics/executives/performance:
 *   get:
 *     summary: Get performance metrics for field executives
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Executive performance data
 */
router.get('/executives/performance', analyticsController.getExecutivePerformance);

/**
 * @swagger
 * /api/admin/analytics/hospitals/performance:
 *   get:
 *     summary: Get performance metrics for hospitals
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hospital performance data
 */
router.get('/hospitals/performance', analyticsController.getHospitalPerformance);

/**
 * @swagger
 * /api/admin/analytics/retention:
 *   get:
 *     summary: Get customer retention metrics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retention data
 */
router.get('/retention', analyticsController.getRetentionMetrics);

/**
 * @swagger
 * /api/admin/analytics/campaigns/performance:
 *   get:
 *     summary: Get performance metrics for marketing campaigns
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Campaign performance data
 */
router.get('/campaigns/performance', analyticsController.getCampaignPerformance);

/**
 * @swagger
 * /api/admin/analytics/system-health:
 *   get:
 *     summary: Get system health and audit log summaries
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System health data
 */
router.get('/system-health', analyticsController.getSystemHealth);

/**
 * @swagger
 * /api/admin/analytics/aggregate:
 *   post:
 *     summary: Trigger manual aggregation of analytics data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Aggregation started
 */
router.post('/aggregate', analyticsController.triggerAggregation);

export { router as analyticsRouter };
