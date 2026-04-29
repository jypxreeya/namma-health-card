import { Request, Response } from 'express';
import { CustomerService } from './customer.service';

const customerService = new CustomerService();

export class CustomerController {
  // Auth
  login = async (req: Request, res: Response) => {
    try {
      const { mobile } = req.body;
      const result = await customerService.initiateLogin(mobile);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  verifyOtp = async (req: Request, res: Response) => {
    try {
      const { mobile, otp, otpReference } = req.body;
      const result = await customerService.verifyOtp(mobile, otp, otpReference);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(401).json({ status: 'error', message: error.message });
    }
  };

  // Profile & Dashboard
  getDashboard = async (req: Request, res: Response) => {
    try {
      const patientId = (req as any).user.id;
      const result = await customerService.getDashboard(patientId);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getProfile = async (req: Request, res: Response) => {
    try {
      const patientId = (req as any).user.id;
      // Re-using dashboard logic for profile for now, or could be separate.
      const result = await customerService.getDashboard(patientId);
      res.status(200).json({ status: 'success', data: result.profile });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  // Card & Family
  getCard = async (req: Request, res: Response) => {
    try {
      const patientId = (req as any).user.id;
      const result = await customerService.getDashboard(patientId);
      res.status(200).json({ status: 'success', data: result.activeCard });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getHistory = async (req: Request, res: Response) => {
    try {
      const patientId = (req as any).user.id;
      const result = await customerService.getServiceHistory(patientId);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  // Support
  createTicket = async (req: Request, res: Response) => {
    try {
      const patientId = (req as any).user.id;
      const result = await customerService.createTicket(patientId, req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  submitFeedback = async (req: Request, res: Response) => {
    try {
      const patientId = (req as any).user.id;
      const result = await customerService.submitFeedback(patientId, req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };
}
