import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { getVisibleFieldExecutiveIds } from '../../utils/access-scope';
import { sendError } from '../../utils/error-response';

export class FieldController {
  private async getLeadScope(req: Request) {
    const user = (req as any).user;
    const visibleExecutiveIds = await getVisibleFieldExecutiveIds(user);
    return visibleExecutiveIds ? { assignedExecutiveId: { in: visibleExecutiveIds } } : {};
  }
  
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
      return sendError(res, error, 400, 'Failed to create lead');
    }
  };

  getLeads = async (req: Request, res: Response) => {
    try {
      const scopedWhere = await this.getLeadScope(req);
      const leads = await prisma.lead.findMany({
        where: scopedWhere,
        orderBy: { createdAt: 'desc' }
      });
      res.status(200).json({ status: 'success', data: leads });
    } catch (error: any) {
      return sendError(res, error, 500, 'Failed to load leads');
    }
  };

  logVisit = async (req: Request, res: Response) => {
    try {
      const { leadId, visitType, geoLat, geoLong, notes } = req.body;
      const user = (req as any).user;
      const executiveId = user.id;
      const scopedWhere = await this.getLeadScope(req);
      const lead = await prisma.lead.findFirst({ where: { id: leadId, ...scopedWhere } });
      if (!lead) {
        return res.status(404).json({ status: 'error', message: 'Lead not found' });
      }

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
      return sendError(res, error, 400, 'Failed to log visit');
    }
  };

  getDashboard = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const visibleExecutiveIds = await getVisibleFieldExecutiveIds(user);
      const executiveWhere = visibleExecutiveIds ? { in: visibleExecutiveIds } : undefined;
      
      const [totalLeads, visitsToday, conversions] = await Promise.all([
        prisma.lead.count({ where: { assignedExecutiveId: executiveWhere } }),
        prisma.fieldVisit.count({ 
          where: { 
            executiveId: executiveWhere,
            visitDate: { gte: new Date(new Date().setHours(0,0,0,0)) }
          } 
        }),
        prisma.patient.count({ where: { fieldExecutiveId: executiveWhere } })
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
      return sendError(res, error, 500, 'Failed to load field dashboard');
    }
  };
}
