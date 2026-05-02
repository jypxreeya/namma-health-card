import { Request, Response } from 'express';
import { BillingService } from './billing.service';

const billingService = new BillingService();

export class BillingController {
  async createInvoice(req: Request, res: Response) {
    try {
      const { visitId, totalAmount, discountAmount } = req.body;
      const invoice = await billingService.createInvoice(visitId, { totalAmount, discountAmount });
      res.json(invoice);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async recordPayment(req: Request, res: Response) {
    try {
      const { invoiceId, amount, paymentMethod, transactionId } = req.body;
      const payment = await billingService.recordPayment(invoiceId, { amount, paymentMethod, transactionId });
      res.json(payment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getInvoice(req: Request, res: Response) {
    try {
      const { visitId } = req.params;
      const invoice = await billingService.getInvoiceByVisit(visitId);
      res.json(invoice);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
