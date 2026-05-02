import { Request, Response } from 'express';
import { AnalyticsService } from './analytics.service';
import { sendError } from '../../utils/error-response';

const analyticsService = new AnalyticsService();

export class AnalyticsController {
  getOverview = async (_req: Request, res: Response) => {
    try {
      const stats = await analyticsService.getOverviewStats();
      res.status(200).json({ status: 'success', data: stats });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load overview');
    }
  };

  getExecutivePerformance = async (req: Request, res: Response) => {
    try {
      const { period } = req.query;
      const results = await analyticsService.getExecutivePerformance(period as string || '2026-05');
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load executive performance');
    }
  };

  getHospitalPerformance = async (req: Request, res: Response) => {
    try {
      const { period } = req.query;
      const results = await analyticsService.getHospitalUtilization(period as string || '2026-05');
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load hospital performance');
    }
  };

  getRetentionMetrics = async (req: Request, res: Response) => {
    try {
      const { period } = req.query;
      const results = await analyticsService.getRetentionMetrics(period as string || '2026-05');
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load retention metrics');
    }
  };

  getCampaignPerformance = async (req: Request, res: Response) => {
    try {
      const { period } = req.query;
      const results = await analyticsService.getCampaignPerformance(period as string || '2026-05');
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load campaign performance');
    }
  };

  triggerAggregation = async (req: Request, res: Response) => {
    try {
      const { period } = req.body;
      const result = await analyticsService.aggregatePerformance(period);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to trigger aggregation');
    }
  };

  getSystemHealth = async (_req: Request, res: Response) => {
    try {
      const result = await analyticsService.getSystemHealth();
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load system health');
    }
  };
}
