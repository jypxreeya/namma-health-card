import { Request, Response } from 'express';
import { HospitalService } from './hospital.service';

const hospitalService = new HospitalService();

export class HospitalController {
  searchPatient = async (req: Request, res: Response) => {
    try {
      const { q } = req.query;
      const results = await hospitalService.searchPatient(q as string);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  validateCard = async (req: Request, res: Response) => {
    try {
      const { patientId } = req.body;
      const result = await hospitalService.validateCard(patientId);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  checkIn = async (req: Request, res: Response) => {
    try {
      // In a real app, hospitalId/branchId would come from the ReceptionUser's session
      // For now, we expect them in body for testing.
      const result = await hospitalService.checkIn(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  serviceEntry = async (req: Request, res: Response) => {
    try {
      const result = await hospitalService.enterServiceUsage(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getVisitHistory = async (req: Request, res: Response) => {
    try {
      const { patientId } = req.query;
      const results = await hospitalService.getVisitHistory(patientId as string);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getDashboard = async (req: Request, res: Response) => {
    try {
      const { hospitalId } = req.query;
      const results = await hospitalService.getUtilizationStats(hospitalId as string);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getDepartments = async (req: Request, res: Response) => {
    try {
      const { branchId } = req.query;
      const results = await hospitalService.getDepartments(branchId as string);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getDoctors = async (req: Request, res: Response) => {
    try {
      const { branchId, departmentId } = req.query;
      const results = await hospitalService.getDoctors(branchId as string, departmentId as string);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };
}
