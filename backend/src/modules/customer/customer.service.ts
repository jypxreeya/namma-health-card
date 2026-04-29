import { prisma } from '../../config/prisma';
import { 
  NotificationType, 
  DeliveryChannel, 
  DeliveryStatus, 
  TicketStatus, 
  TicketPriority 
} from '@prisma/client';
import jwt from 'jsonwebtoken';

export class CustomerService {
  // 1. OTP Login (Simulated OTP for now)
  async initiateLogin(mobile: string) {
    const patient = await prisma.patient.findUnique({
      where: { mobile, isDeleted: false }
    });

    if (!patient) throw new Error('Mobile number not registered.');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpReference = `OTP-${Date.now()}`;

    // Log the OTP in WhatsApp Log (simulated trigger)
    await prisma.whatsappLog.create({
      data: {
        patientId: patient.id,
        triggerEvent: 'LOGIN_OTP',
        templateName: 'otp_template',
        deliveryStatus: 'SENT',
        failureReason: `OTP: ${otp} (For testing)`
      }
    });

    return { otpReference, message: 'OTP sent successfully.' };
  }

  async verifyOtp(mobile: string, otp: string, otpReference: string) {
    // In a real app, verify against Redis or DB. Here we just simulate.
    const patient = await prisma.patient.findUnique({
      where: { mobile },
      include: { 
        healthCards: { where: { cardStatus: 'ACTIVE' } },
        memberships: { where: { status: 'ACTIVE' }, include: { membershipPlan: true } }
      }
    });

    if (!patient) throw new Error('Patient not found.');

    // Generate JWT for Customer
    const token = jwt.sign(
      { id: patient.id, mobile: patient.mobile, role: 'CUSTOMER' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    // Create Customer Session
    await prisma.customerSession.create({
      data: {
        patientId: patient.id,
        otpReference,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    return { token, patient };
  }

  // 2. Customer Dashboard Data
  async getDashboard(patientId: string) {
    const [patient, activeCard, activeMembership, notifications, familyCount] = await Promise.all([
      prisma.patient.findUnique({ where: { id: patientId } }),
      prisma.healthCard.findFirst({ where: { patientId, cardStatus: 'ACTIVE' } }),
      prisma.membership.findFirst({ where: { patientId, status: 'ACTIVE' }, include: { membershipPlan: true } }),
      prisma.notification.findMany({ where: { patientId, readAt: null }, take: 5, orderBy: { sentAt: 'desc' } }),
      prisma.familyMember.count({ where: { patientId, status: 'ACTIVE' } })
    ]);

    return {
      profile: patient,
      activeCard,
      activeMembership,
      notifications,
      familyCount
    };
  }

  // 3. Service History
  async getServiceHistory(patientId: string) {
    return prisma.patientVisit.findMany({
      where: { patientId },
      include: {
        hospital: { select: { hospitalName: true } },
        serviceUsages: true,
        benefitUsages: true
      },
      orderBy: { visitDate: 'desc' }
    });
  }

  // 4. Support & Complaints
  async createTicket(patientId: string, payload: {
    ticketType: string;
    subject: string;
    description: string;
    priority?: TicketPriority;
  }) {
    return prisma.supportTicket.create({
      data: {
        patientId,
        ticketType: payload.ticketType,
        subject: payload.subject,
        description: payload.description,
        priority: payload.priority || 'MEDIUM',
        ticketStatus: 'OPEN'
      }
    });
  }

  async createComplaint(patientId: string, payload: {
    ticketId: string;
    category: string;
    severity: string;
  }) {
    // Validate ticket belongs to patient
    const ticket = await prisma.supportTicket.findUnique({ where: { id: payload.ticketId } });
    if (!ticket || ticket.patientId !== patientId) throw new Error('Invalid ticket.');

    return prisma.complaint.create({
      data: {
        ticketId: payload.ticketId,
        complaintCategory: payload.category,
        severity: payload.severity
      }
    });
  }

  // 5. Feedback
  async submitFeedback(patientId: string, payload: {
    visitId?: string;
    hospitalId?: string;
    rating: number;
    text?: string;
  }) {
    return prisma.feedback.create({
      data: {
        patientId,
        visitId: payload.visitId,
        hospitalId: payload.hospitalId,
        rating: payload.rating,
        feedbackText: payload.text
      }
    });
  }

  // 6. Communications (Abstraction)
  async sendNotification(patientId: string, type: NotificationType, title: string, message: string) {
    return prisma.notification.create({
      data: {
        patientId,
        notificationType: type,
        title,
        message,
        deliveryChannel: 'WHATSAPP', // Default for now
        deliveryStatus: 'SENT',
        sentAt: new Date()
      }
    });
  }

  async logActivity(patientId: string, type: string, metadata: any) {
    return prisma.customerActivityLog.create({
      data: {
        patientId,
        activityType: type,
        metadata,
        occurredAt: new Date()
      }
    });
  }
}
