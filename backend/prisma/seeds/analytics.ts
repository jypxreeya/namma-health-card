import { PrismaClient } from '@prisma/client';

export async function seedAnalytics(prisma: PrismaClient) {
  console.log('Seeding Analytics & Operational Intelligence (Phase 8)...');

  // 1. Initial Dashboard Aggregates (Sample)
  await prisma.dashboardAggregate.create({
    data: {
      metricType: 'REVENUE',
      metricScope: 'GLOBAL',
      metricDate: new Date('2026-05-01'),
      metricValue: 150000.00,
      dimensions: { region: 'South' }
    }
  });

  // 2. Retention Metrics Sample
  await prisma.retentionMetric.upsert({
    where: { id: '00000000-0000-0000-0000-000000000003' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000003',
      reportingPeriod: '2026-05',
      activeCustomers: 500,
      churnedCustomers: 10,
      renewalRate: 98.00,
      repeatUsageRate: 45.50,
      averageLifetimeValue: 2500.00
    }
  });

  // 3. Support Performance Sample
  await prisma.supportPerformanceMetric.create({
    data: {
      reportingPeriod: '2026-05',
      totalTickets: 120,
      resolvedTickets: 115,
      avgResolutionTime: 2.5,
      complaintEscalations: 2,
      satisfactionScore: 4.8
    }
  });

  // 4. System Health Initial Log
  await prisma.systemHealthLog.create({
    data: {
      serviceName: 'CoreAPI',
      eventType: 'STARTUP',
      severity: 'INFO',
      message: 'Namma Health Card Analytics Module Initialized',
      metadata: { version: '1.0.0-analytics' }
    }
  });

  console.log('Analytics seeded.');
}
