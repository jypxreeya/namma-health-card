import { Request, Response } from 'express';
import { AnalyticsService } from './analytics.service';

const analyticsService = new AnalyticsService();

export class AnalyticsController {
  getOverview = async (_req: Request, res: Response) => {
    try {
      const stats = await analyticsService.getOverviewStats();
      res.status(200).json({ status: 'success', data: stats });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getExecutivePerformance = async (req: Request, res: Response) => {
    try {
      const { period } = req.query;
      const results = await analyticsService.getExecutivePerformance(period as string || '2026-05');
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getHospitalPerformance = async (req: Request, res: Response) => {
    try {
      const { period } = req.query;
      const results = await analyticsService.getHospitalUtilization(period as string || '2026-05');
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getRetentionMetrics = async (req: Request, res: Response) => {
    try {
      const { period } = req.query;
      const results = await analyticsService.getRetentionMetrics(period as string || '2026-05');
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getCampaignPerformance = async (req: Request, res: Response) => {
    try {
      const { period } = req.query;
      const results = await analyticsService.getCampaignPerformance(period as string || '2026-05');
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  triggerAggregation = async (req: Request, res: Response) => {
    try {
      const { period } = req.body;
      const result = await analyticsService.aggregatePerformance(period);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getSystemHealth = async (_req: Request, res: Response) => {
    try {
      const result = await analyticsService.getSystemHealth();
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };
}
