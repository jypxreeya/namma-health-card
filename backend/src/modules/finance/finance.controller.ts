import { Request, Response } from 'express';
import { FinanceService } from './finance.service';
import { sendError } from '../../utils/error-response';

const financeService = new FinanceService();

export class FinanceController {
  validateCoupon = async (req: Request, res: Response) => {
    try {
      const { couponCode } = req.body;
      const campaign = await financeService.validateCoupon(couponCode);
      res.status(200).json({ status: 'success', data: campaign });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to validate coupon');
    }
  };

  getSettlements = async (req: Request, res: Response) => {
    try {
      const { hospitalId } = req.query;
      const results = await financeService.getHospitalSettlements(hospitalId as string);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load settlements');
    }
  };

  getCommissions = async (req: Request, res: Response) => {
    try {
      const { executiveId } = req.query;
      const results = await financeService.getExecutiveCommissions(executiveId as string);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load commissions');
    }
  };

  recordPayment = async (req: Request, res: Response) => {
    try {
      const result = await financeService.recordMembershipPayment(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to record payment');
    }
  };

  processRenewal = async (req: Request, res: Response) => {
    try {
      const result = await financeService.processRenewal(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to process renewal');
    }
  };

  getDashboard = async (req: Request, res: Response) => {
    try {
      const result = await financeService.getFinanceDashboard();
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load finance dashboard');
    }
  };
}
