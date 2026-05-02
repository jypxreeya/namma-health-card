import { Request, Response } from 'express';
import { BillingService } from './billing.service';
import { getReceptionScope } from '../../utils/access-scope';
import { sendError } from '../../utils/error-response';
import { prisma } from '../../config/prisma';

const billingService = new BillingService();

export class BillingController {
  private async canAccessVisit(req: Request, visitId: string) {
    const user = (req as any).user;
    const receptionScope = await getReceptionScope(user);
    if (!receptionScope) {
      return true;
    }

    const visit = await prisma.patientVisit.findFirst({
      where: { id: visitId, hospitalId: receptionScope.hospitalId, branchId: receptionScope.branchId },
      select: { id: true },
    });
    return !!visit;
  }

  private async canAccessInvoice(req: Request, invoiceId: string) {
    const user = (req as any).user;
    const receptionScope = await getReceptionScope(user);
    if (!receptionScope) {
      return true;
    }

    const invoice = await prisma.patientInvoice.findFirst({
      where: {
        id: invoiceId,
        visit: {
          hospitalId: receptionScope.hospitalId,
          branchId: receptionScope.branchId,
        },
      },
      select: { id: true },
    });
    return !!invoice;
  }

  createInvoice = async (req: Request, res: Response) => {
    try {
      const { visitId, totalAmount, discountAmount } = req.body;
      if (!(await this.canAccessVisit(req, visitId))) {
        return res.status(404).json({ status: 'error', message: 'Visit not found' });
      }
      const invoice = await billingService.createInvoice(visitId, { totalAmount, discountAmount });
      res.json(invoice);
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to create invoice');
    }
  };

  recordPayment = async (req: Request, res: Response) => {
    try {
      const { invoiceId, amount, paymentMethod, transactionId } = req.body;
      if (!(await this.canAccessInvoice(req, invoiceId))) {
        return res.status(404).json({ status: 'error', message: 'Invoice not found' });
      }
      const payment = await billingService.recordPayment(invoiceId, { amount, paymentMethod, transactionId });
      res.json(payment);
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to record payment');
    }
  };

  getInvoice = async (req: Request, res: Response) => {
    try {
      const visitId = String(req.params.visitId);
      if (!(await this.canAccessVisit(req, visitId))) {
        return res.status(404).json({ status: 'error', message: 'Visit not found' });
      }
      const invoice = await billingService.getInvoiceByVisit(visitId);
      res.json(invoice);
    } catch (error: any) {
      return sendError(res, error, 400, 'Failed to load invoice');
    }
  };
}
