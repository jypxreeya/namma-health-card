import { Request, Response } from 'express';
import { RegistrationService } from './registration.service';
import { getVisibleFieldExecutiveIds } from '../../utils/access-scope';
import { sendError } from '../../utils/error-response';
import { prisma } from '../../config/prisma';

export class RegistrationController {
  private registrationService = new RegistrationService();

  onboardPatient = async (req: Request, res: Response) => {
    try {
      const executiveId = (req as any).user?.id; // from authGuard
      if (!executiveId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (req.body.leadId) {
        const visibleExecutiveIds = await getVisibleFieldExecutiveIds((req as any).user);
        const lead = await prisma.lead.findFirst({
          where: {
            id: req.body.leadId,
            assignedExecutiveId: visibleExecutiveIds ? { in: visibleExecutiveIds } : undefined,
          },
          select: { id: true },
        });
        if (!lead) {
          return res.status(404).json({ status: 'error', message: 'Lead not found' });
        }
      }

      const result = await this.registrationService.onboardPatient(req.body, executiveId);
      return res.status(201).json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to onboard patient');
    }
  };

  saveDraft = async (req: Request, res: Response) => {
    try {
      const executiveId = (req as any).user?.id;
      const result = await this.registrationService.saveDraft(req.body, executiveId);
      return res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to save draft');
    }
  };

  getDrafts = async (req: Request, res: Response) => {
    try {
      const executiveId = (req as any).user?.id;
      const result = await this.registrationService.getDrafts(executiveId);
      return res.status(200).json({ status: 'success', data: result });
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load drafts');
    }
  };
}
