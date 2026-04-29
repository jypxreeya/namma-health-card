import { Request, Response } from 'express';
import { RegistrationService } from './registration.service';

export class RegistrationController {
  private registrationService = new RegistrationService();

  onboardPatient = async (req: Request, res: Response) => {
    try {
      const executiveId = (req as any).user?.id; // from authGuard
      if (!executiveId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const result = await this.registrationService.onboardPatient(req.body, executiveId);
      return res.status(201).json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      console.error('Onboarding Error:', error.message);
      return res.status(400).json({
        status: 'error',
        message: error.message || 'Failed to onboard patient',
      });
    }
  };
}
