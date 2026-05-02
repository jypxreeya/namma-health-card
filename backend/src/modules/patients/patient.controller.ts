import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { getVisibleFieldExecutiveIds, isAdminRole } from '../../utils/access-scope';
import { sendError } from '../../utils/error-response';

export class PatientController {
  private async getPatientWhere(req: Request) {
    const user = (req as any).user;
    if (!user || isAdminRole(user.role) || user.role === 'RECEPTIONIST') {
      return {};
    }

    const visibleExecutiveIds = await getVisibleFieldExecutiveIds(user);
    return { fieldExecutiveId: { in: visibleExecutiveIds } };
  }
  
  getPatient = async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      const scopedWhere = await this.getPatientWhere(req);
      
      const patient = await prisma.patient.findFirst({
        where: { id, ...scopedWhere },
        include: {
          addresses: true,
          familyMembers: true,
          memberships: true,
          healthCards: true,
        }
      });

      if (!patient) {
        return res.status(404).json({ status: 'error', message: 'Patient not found' });
      }

      res.status(200).json({ status: 'success', data: patient });
    } catch (error: any) {
      return sendError(res, error, 500, 'Failed to load patient');
    }
  };

  searchPatients = async (req: Request, res: Response) => {
    try {
      const query = String(req.query.query);
      const scopedWhere = await this.getPatientWhere(req);
      
      const patients = await prisma.patient.findMany({
        where: {
          ...scopedWhere,
          OR: [
            { mobile: { contains: query, mode: 'insensitive' } },
            { patientCode: { contains: query, mode: 'insensitive' } },
            { fullName: { contains: query, mode: 'insensitive' } },
          ]
        },
        take: 20
      });

      res.status(200).json({ status: 'success', data: patients });
    } catch (error: any) {
      return sendError(res, error, 500, 'Failed to search patients');
    }
  };
}
