import { PrismaClient } from '@prisma/client';

export async function seedCustomerEngagement(prisma: PrismaClient) {
  console.log('Seeding Customer Engagement (Phase 7)...');

  // 1. Communication Templates
  const templates = [
    {
      templateName: 'welcome_template',
      templateType: 'WHATSAPP',
      triggerEvent: 'REGISTRATION_COMPLETE',
      content: 'Welcome to Namma Health Card, {{name}}! Your card is now active.'
    },
    {
      templateName: 'renewal_reminder',
      templateType: 'WHATSAPP',
      triggerEvent: 'MEMBERSHIP_EXPIRY_NEAR',
      content: 'Hi {{name}}, your Namma Health Card expires in 7 days. Renew now for continued benefits!'
    },
    {
      templateName: 'otp_template',
      templateType: 'WHATSAPP',
      triggerEvent: 'LOGIN_OTP',
      content: 'Your OTP for Namma Health Card login is: {{otp}}. Reference: {{ref}}'
    },
    {
      templateName: 'visit_thanks',
      templateType: 'WHATSAPP',
      triggerEvent: 'HOSPITAL_VISIT_COMPLETE',
      content: 'Thank you for using Namma Health Card at {{hospital}}. You saved {{discount}} on your visit!'
    }
  ];

  for (const t of templates) {
    await prisma.communicationTemplate.upsert({
      where: { templateName: t.templateName },
      update: {},
      create: {
        ...t as any,
        approvalStatus: 'APPROVED'
      }
    });
  }

  console.log('Customer Engagement seeded.');
}
