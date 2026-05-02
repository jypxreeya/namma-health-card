import { Request, Response } from 'express';
import { CustomerService } from './customer.service';
import { sendError } from '../../utils/error-response';

const customerService = new CustomerService();

export class CustomerController {
  // Auth
  login = async (req: Request, res: Response) => {
    try {
      const { mobile } = req.body;
      const result = await customerService.initiateLogin(mobile);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to start login');
    }
  };

  verifyOtp = async (req: Request, res: Response) => {
    try {
      const { mobile, otp, otpReference } = req.body;
      const result = await customerService.verifyOtp(mobile, otp, otpReference);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 401, 'Invalid or expired OTP');
    }
  };

  // Profile & Dashboard
  getDashboard = async (req: Request, res: Response) => {
    try {
      const patientId = (req as any).user.id;
      const result = await customerService.getDashboard(patientId);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load dashboard');
    }
  };

  getProfile = async (req: Request, res: Response) => {
    try {
      const patientId = (req as any).user.id;
      // Re-using dashboard logic for profile for now, or could be separate.
      const result = await customerService.getDashboard(patientId);
      res.status(200).json({ status: 'success', data: result.profile });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load profile');
    }
  };

  // Card & Family
  getCard = async (req: Request, res: Response) => {
    try {
      const patientId = (req as any).user.id;
      const result = await customerService.getDashboard(patientId);
      res.status(200).json({ status: 'success', data: result.activeCard });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load card');
    }
  };

  getHistory = async (req: Request, res: Response) => {
    try {
      const patientId = (req as any).user.id;
      const result = await customerService.getServiceHistory(patientId);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load history');
    }
  };

  // Support
  createTicket = async (req: Request, res: Response) => {
    try {
      const patientId = (req as any).user.id;
      const result = await customerService.createTicket(patientId, req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to create support ticket');
    }
  };

  submitFeedback = async (req: Request, res: Response) => {
    try {
      const patientId = (req as any).user.id;
      const result = await customerService.submitFeedback(patientId, req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to submit feedback');
    }
  };
}
