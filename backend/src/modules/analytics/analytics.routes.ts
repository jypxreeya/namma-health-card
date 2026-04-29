import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import { authGuard } from '../../guards/auth.guard';

const router = Router();
const analyticsController = new AnalyticsController();

router.use(authGuard);

router.get('/dashboard/overview', analyticsController.getOverview);
router.get('/executives/performance', analyticsController.getExecutivePerformance);
router.get('/hospitals/performance', analyticsController.getHospitalPerformance);
router.get('/retention', analyticsController.getRetentionMetrics);
router.get('/campaigns/performance', analyticsController.getCampaignPerformance);
router.get('/system-health', analyticsController.getSystemHealth);
router.post('/aggregate', analyticsController.triggerAggregation);

export { router as analyticsRouter };
