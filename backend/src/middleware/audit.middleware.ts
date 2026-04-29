import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';

export const auditLog = (action: string, entityType?: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;
    const userId = (req as any).user?.id;

    res.json = function (data) {
      // Only log successful actions
      if (res.statusCode >= 200 && res.statusCode < 300) {
        // Run in background to not block response
        prisma.auditLog.create({
          data: {
            userId,
            action,
            entityType,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
            newValues: data
          }
        }).catch(err => console.error('Audit Log Error:', err));
      }
      return originalJson.call(this, data);
    };

    next();
  };
};
