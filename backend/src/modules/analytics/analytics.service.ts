import { prisma } from '../../config/prisma';
import { MetricType, ExportStatus } from '@prisma/client';

export class AnalyticsService {
  // 1. Overview Dashboard
  async getOverviewStats() {
    const [totalPatients, activeMemberships, totalVisits, totalRevenue] = await Promise.all([
      prisma.patient.count({ where: { isDeleted: false } }),
      prisma.membership.count({ where: { status: 'ACTIVE' } }),
      prisma.patientVisit.count(),
      prisma.optionalMembershipPayment.aggregate({
        _sum: { amount: true },
        where: { paymentStatus: 'PAID' }
      })
    ]);

    return {
      totalPatients,
      activeMemberships,
      totalVisits,
      totalRevenue: totalRevenue._sum.amount || 0
    };
  }

  // 2. Executive Performance
  async getExecutivePerformance(period: string) {
    return prisma.executivePerformanceMetric.findMany({
      where: { reportingPeriod: period },
      include: {
        executive: { select: { firstName: true, lastName: true, employeeId: true } }
      },
      orderBy: { performanceScore: 'desc' }
    });
  }

  // 3. Hospital Utilization
  async getHospitalUtilization(period: string) {
    return prisma.hospitalPerformanceMetric.findMany({
      where: { reportingPeriod: period },
      include: {
        hospital: { select: { hospitalName: true, hospitalCode: true } },
        branch: { select: { branchName: true } }
      },
      orderBy: { patientVisits: 'desc' }
    });
  }

  // 4. Campaign Performance
  async getCampaignPerformance(period: string) {
    return prisma.campaignPerformance.findMany({
      where: { reportingPeriod: period },
      include: {
        campaign: { select: { campaignName: true, couponCode: true } }
      },
      orderBy: { registrationsGenerated: 'desc' }
    });
  }

  // 5. Retention Metrics
  async getRetentionMetrics(period: string) {
    return prisma.retentionMetric.findFirst({
      where: { reportingPeriod: period }
    });
  }

  // 6. Support Performance
  async getSupportPerformance(period: string) {
    return prisma.supportPerformanceMetric.findFirst({
      where: { reportingPeriod: period }
    });
  }

  // 7. Data Aggregation Trigger (Manual for now)
  async aggregatePerformance(period: string) {
    // This would typically be a background cron job.
    // Here we simulate the aggregation logic for demo.
    
    return prisma.$transaction(async (tx) => {
      // Aggregate Executive Performance
      const executives = await tx.user.findMany({
        where: { role: { code: 'FIELD_EXECUTIVE' } }
      });

      for (const exec of executives) {
        const registrations = await tx.patient.count({
          where: { fieldExecutiveId: exec.id }
        });
        
        // Simple score: registrations * 10
        const score = registrations * 10;

        await tx.executivePerformanceMetric.upsert({
          where: { id: `METRIC-EXEC-${exec.id}-${period}` }, // Note: id is UUID in schema, using dummy mapping here
          update: {
            registrationsCount: registrations,
            performanceScore: score
          },
          create: {
            executiveId: exec.id,
            reportingPeriod: period,
            registrationsCount: registrations,
            performanceScore: score
          }
        });
      }
      
      return { status: 'success', message: `Aggregation completed for period ${period}` };
    });
  }

  // 8. System Health
  async getSystemHealth() {
    const recentLogs = await prisma.systemHealthLog.findMany({
      take: 20,
      orderBy: { occurredAt: 'desc' }
    });

    return {
      status: 'HEALTHY',
      lastCheck: new Date(),
      recentEvents: recentLogs
    };
  }
}
