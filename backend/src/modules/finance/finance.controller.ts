import { Request, Response } from 'express';
import { FinanceService } from './finance.service';

const financeService = new FinanceService();

export class FinanceController {
  validateCoupon = async (req: Request, res: Response) => {
    try {
      const { couponCode } = req.body;
      const campaign = await financeService.validateCoupon(couponCode);
      res.status(200).json({ status: 'success', data: campaign });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getSettlements = async (req: Request, res: Response) => {
    try {
      const { hospitalId } = req.query;
      const results = await financeService.getHospitalSettlements(hospitalId as string);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getCommissions = async (req: Request, res: Response) => {
    try {
      const { executiveId } = req.query;
      const results = await financeService.getExecutiveCommissions(executiveId as string);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  recordPayment = async (req: Request, res: Response) => {
    try {
      const result = await financeService.recordMembershipPayment(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  processRenewal = async (req: Request, res: Response) => {
    try {
      const result = await financeService.processRenewal(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getDashboard = async (req: Request, res: Response) => {
    try {
      const result = await financeService.getFinanceDashboard();
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };
}
