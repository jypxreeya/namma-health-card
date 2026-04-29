import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';

export class FieldController {
  
  createLead = async (req: Request, res: Response) => {
    try {
      const { mobile, fullName, area } = req.body;
      const executiveId = (req as any).user?.id;

      const leadCode = `LD-${Date.now().toString().slice(-6)}`;
      const lead = await prisma.lead.create({
        data: {
          leadCode,
          fullName,
          mobile,
          area,
          assignedExecutiveId: executiveId,
          source: 'FIELD_APP',
        }
      });
      res.status(201).json({ status: 'success', data: lead });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getLeads = async (req: Request, res: Response) => {
    try {
      const executiveId = (req as any).user?.id;
      const leads = await prisma.lead.findMany({
        where: { assignedExecutiveId: executiveId },
        orderBy: { createdAt: 'desc' }
      });
      res.status(200).json({ status: 'success', data: leads });
    } catch (error: any) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };

  logVisit = async (req: Request, res: Response) => {
    try {
      const { leadId, visitType, geoLat, geoLong, notes } = req.body;
      const executiveId = (req as any).user?.id;

      const visit = await prisma.fieldVisit.create({
        data: {
          executiveId,
          leadId,
          visitDate: new Date(),
          visitType,
          geoLat,
          geoLong,
          notes,
          visitStatus: 'COMPLETED'
        }
      });
      
      // Update lead status to CONTACTED if it was NEW
      await prisma.lead.updateMany({
        where: { id: leadId, leadStatus: 'NEW' },
        data: { leadStatus: 'CONTACTED' }
      });

      res.status(201).json({ status: 'success', data: visit });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };

  getDashboard = async (req: Request, res: Response) => {
    try {
      const { id: executiveId } = (req as any).user;
      
      const [totalLeads, visitsToday, conversions] = await Promise.all([
        prisma.lead.count({ where: { assignedExecutiveId: executiveId } }),
        prisma.fieldVisit.count({ 
          where: { 
            executiveId: executiveId,
            visitDate: { gte: new Date(new Date().setHours(0,0,0,0)) }
          } 
        }),
        prisma.patient.count({ where: { fieldExecutiveId: executiveId } })
      ]);

      return res.json({
        status: 'success',
        data: {
          totalLeads,
          visitsToday,
          conversionsThisMonth: conversions, // Simple count for demo
        }
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
}
