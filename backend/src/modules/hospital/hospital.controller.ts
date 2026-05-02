import { Request, Response } from 'express';
import { HospitalService } from './hospital.service';
import { getReceptionScope } from '../../utils/access-scope';
import { sendError } from '../../utils/error-response';
import { prisma } from '../../config/prisma';

const hospitalService = new HospitalService();

export class HospitalController {
  searchPatient = async (req: Request, res: Response) => {
    try {
      const { q } = req.query;
      const results = await hospitalService.searchPatient(q as string);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to search patients');
    }
  };

  validateCard = async (req: Request, res: Response) => {
    try {
      const { patientId } = req.body;
      const result = await hospitalService.validateCard(patientId);
      res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to validate card');
    }
  };

  checkIn = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const receptionScope = await getReceptionScope(user);
      const payload = { ...req.body };

      if (user.role === 'RECEPTIONIST') {
        if (!receptionScope) {
          return res.status(403).json({ status: 'error', message: 'Reception assignment not found' });
        }
        payload.hospitalId = receptionScope.hospitalId;
        payload.branchId = receptionScope.branchId;
        payload.receptionUserId = receptionScope.id;
      } else if (!payload.hospitalId || !payload.branchId || !payload.receptionUserId) {
        return res.status(400).json({ status: 'error', message: 'hospitalId, branchId, and receptionUserId are required' });
      }

      const result = await hospitalService.checkIn(payload);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to check in patient');
    }
  };

  serviceEntry = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const receptionScope = await getReceptionScope(user);
      if (user.role === 'RECEPTIONIST') {
        if (!receptionScope) {
          return res.status(403).json({ status: 'error', message: 'Reception assignment not found' });
        }
        const visit = await prisma.patientVisit.findFirst({
          where: { id: req.body.visitId, hospitalId: receptionScope.hospitalId, branchId: receptionScope.branchId },
          select: { id: true },
        });
        if (!visit) {
          return res.status(404).json({ status: 'error', message: 'Visit not found' });
        }
      }

      const result = await hospitalService.enterServiceUsage(req.body);
      res.status(201).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to record service entry');
    }
  };

  getVisitHistory = async (req: Request, res: Response) => {
    try {
      const { patientId } = req.query;
      const user = (req as any).user;
      const receptionScope = await getReceptionScope(user);
      const results = await hospitalService.getVisitHistory(
        patientId as string,
        receptionScope ? receptionScope.hospitalId : undefined,
      );
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load visit history');
    }
  };

  getDashboard = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const receptionScope = await getReceptionScope(user);
      const hospitalId = receptionScope ? receptionScope.hospitalId : String(req.query.hospitalId || '');
      if (!hospitalId) {
        return res.status(400).json({ status: 'error', message: 'hospitalId is required' });
      }

      const results = await hospitalService.getUtilizationStats(hospitalId);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load utilization dashboard');
    }
  };

  getDepartments = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const receptionScope = await getReceptionScope(user);
      const branchId = receptionScope ? receptionScope.branchId : String(req.query.branchId || '');
      if (!branchId) {
        return res.status(400).json({ status: 'error', message: 'branchId is required' });
      }

      const results = await hospitalService.getDepartments(branchId);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load departments');
    }
  };

  getDoctors = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const receptionScope = await getReceptionScope(user);
      const branchId = receptionScope ? receptionScope.branchId : String(req.query.branchId || '');
      if (!branchId) {
        return res.status(400).json({ status: 'error', message: 'branchId is required' });
      }

      const results = await hospitalService.getDoctors(branchId, req.query.departmentId as string | undefined);
      res.status(200).json({ status: 'success', data: results });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load doctors');
    }
  };
}
