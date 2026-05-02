import { prisma } from '../../config/prisma';
import { InvoiceStatus, PaymentMethod } from '@prisma/client';

export class BillingService {
  // 1. Create Invoice for a Visit
  async createInvoice(visitId: string, payload: {
    totalAmount: number;
    discountAmount: number;
  }) {
    const netAmount = payload.totalAmount - payload.discountAmount;
    
    // Generate a unique invoice number (e.g., INV-2026-0001)
    const count = await prisma.patientInvoice.count();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;

    return prisma.patientInvoice.create({
      data: {
        visitId,
        invoiceNumber,
        totalAmount: payload.totalAmount,
        discountAmount: payload.discountAmount,
        netAmount,
        status: 'ISSUED'
      }
    });
  }

  // 2. Record Payment
  async recordPayment(invoiceId: string, payload: {
    amount: number;
    paymentMethod: PaymentMethod;
    transactionId?: string;
  }) {
    return prisma.$transaction(async (tx) => {
      const payment = await tx.patientPayment.create({
        data: {
          invoiceId,
          amount: payload.amount,
          paymentMethod: payload.paymentMethod,
          transactionId: payload.transactionId
        }
      });

      // Update invoice status if fully paid
      const invoice = await tx.patientInvoice.findUnique({
        where: { id: invoiceId },
        include: { payments: true }
      });

      if (invoice) {
        const totalPaid = invoice.payments.reduce((sum, p) => sum + Number(p.amount), 0);
        if (totalPaid >= Number(invoice.netAmount)) {
          await tx.patientInvoice.update({
            where: { id: invoiceId },
            data: { status: 'PAID' }
          });
        } else if (totalPaid > 0) {
          await tx.patientInvoice.update({
            where: { id: invoiceId },
            data: { status: 'PARTIALLY_PAID' }
          });
        }
      }

      return payment;
    });
  }

  // 3. Get Invoice by Visit ID
  async getInvoiceByVisit(visitId: string) {
    return prisma.patientInvoice.findUnique({
      where: { visitId },
      include: { payments: true }
    });
  }

  // 4. Get Hospital Revenue Report (Daily)
  async getDailyRevenue(hospitalId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return prisma.patientPayment.aggregate({
      where: {
        invoice: {
          visit: {
            hospitalId
          }
        },
        paymentDate: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      _sum: {
        amount: true
      }
    });
  }
}
