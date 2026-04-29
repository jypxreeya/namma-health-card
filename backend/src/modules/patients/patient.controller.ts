import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';

export class PatientController {
  
  getPatient = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const patient = await prisma.patient.findUnique({
        where: { id },
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
      res.status(500).json({ status: 'error', message: error.message });
    }
  };

  searchPatients = async (req: Request, res: Response) => {
    try {
      const { query } = req.query;
      
      const patients = await prisma.patient.findMany({
        where: {
          OR: [
            { mobile: { contains: query as string, mode: 'insensitive' } },
            { patientCode: { contains: query as string, mode: 'insensitive' } },
            { fullName: { contains: query as string, mode: 'insensitive' } },
          ]
        },
        take: 20
      });

      res.status(200).json({ status: 'success', data: patients });
    } catch (error: any) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };
}
