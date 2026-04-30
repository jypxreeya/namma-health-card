import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/prisma';

export class AuthController {
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true },
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (user.status !== 'ACTIVE') {
        return res.status(403).json({ message: 'Account is not active' });
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role.code,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      });

      // Log the session
      await prisma.session.create({
        data: {
          userId: user.id,
          token: token,
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'] || '',
          expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
        }
      });

      return res.json({
        status: 'success',
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role.code,
        }
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  fieldLogin = async (req: Request, res: Response) => {
    try {
      const { mobile } = req.body;
      const user = await prisma.user.findUnique({
        where: { mobile },
        include: { role: true }
      });

      if (!user || user.role.code !== 'FIELD_EXECUTIVE') {
        return res.status(404).json({ message: 'Field Executive not found' });
      }

      // Generate a simple 6-digit OTP for dev/testing
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

      await prisma.user.update({
        where: { id: user.id },
        data: { otp, otpExpiresAt: expiresAt }
      });

      // In production, send SMS here. For dev, we return it or log it.
      console.log(`[DEV] OTP for ${mobile}: ${otp}`);

      return res.json({
        status: 'success',
        message: 'OTP sent successfully',
        otp: process.env.NODE_ENV === 'development' ? otp : undefined
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  verifyFieldOtp = async (req: Request, res: Response) => {
    try {
      const { mobile, otp } = req.body;
      const user = await prisma.user.findUnique({
        where: { mobile },
        include: { role: true }
      });

      if (!user || !user.otp || user.otp !== otp || (user.otpExpiresAt && user.otpExpiresAt < new Date())) {
        return res.status(401).json({ message: 'Invalid or expired OTP' });
      }

      // Clear OTP
      await prisma.user.update({
        where: { id: user.id },
        data: { otp: null, otpExpiresAt: null }
      });

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role.code,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
        expiresIn: '7d', // Longer session for mobile
      });

      return res.json({
        status: 'success',
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role.code,
        }
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  getMenus = async (req: Request, res: Response) => {
    try {
      const { id: userId, role: roleCode } = (req as any).user;

      // Fetch menus accessible to this role
      const roleMenus = await prisma.roleMenuAccess.findMany({
        where: { role: { code: roleCode } },
        include: {
          menu: {
            include: {
              children: {
                orderBy: { sortOrder: 'asc' }
              }
            }
          }
        },
        orderBy: { menu: { sortOrder: 'asc' } }
      });

      // Filter for parent menus only and map to clean structure
      const menus = roleMenus
        .filter(rm => !rm.menu.parentId)
        .map(rm => ({
          id: rm.menu.id,
          label: rm.menu.label,
          icon: rm.menu.icon,
          path: rm.menu.path,
          children: rm.menu.children.map(child => ({
            id: child.id,
            label: child.label,
            icon: child.icon,
            path: child.path
          }))
        }));

      return res.json({ status: 'success', data: menus });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
}
