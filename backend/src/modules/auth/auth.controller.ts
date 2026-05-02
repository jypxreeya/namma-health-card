import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/prisma';
import { getRequiredEnv } from '../../config/env';
import { sendError } from '../../utils/error-response';

const ACCESS_TOKEN_EXPIRY = '1h';
const REFRESH_TOKEN_EXPIRY = '7d';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

export class AuthController {
  private generateTokens = (payload: any) => {
    const accessToken = jwt.sign(payload, getRequiredEnv('JWT_SECRET'), {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign(payload, getRequiredEnv('JWT_REFRESH_SECRET'), {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    return { accessToken, refreshToken };
  };

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

      const { accessToken, refreshToken } = this.generateTokens(payload);

      // Create session with refresh token rotation
      await prisma.session.create({
        data: {
          userId: user.id,
          token: accessToken,
          refreshToken: refreshToken,
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'] || '',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        }
      });

      res.cookie('accessToken', accessToken, { ...COOKIE_OPTIONS, maxAge: 1 * 60 * 60 * 1000 }); // 1h
      res.cookie('refreshToken', refreshToken, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7d

      return res.json({
        status: 'success',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role.code,
        }
      });
    } catch (error: any) {
      return sendError(res, error, 500, 'Login failed');
    }
  };

  refresh = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token missing' });
      }

      // Verify refresh token
      const decoded: any = jwt.verify(refreshToken, getRequiredEnv('JWT_REFRESH_SECRET'));
      
      // Check if session exists and is not revoked
      const session = await prisma.session.findUnique({
        where: { refreshToken },
      });

      if (!session || session.isRevoked || session.expiresAt < new Date()) {
        return res.status(401).json({ message: 'Invalid or expired refresh token' });
      }

      // Generate new tokens (Rotation)
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = this.generateTokens({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      });

      // Update session with new refresh token (Rotation)
      await prisma.session.update({
        where: { id: session.id },
        data: {
          token: newAccessToken,
          refreshToken: newRefreshToken,
          lastActivityAt: new Date(),
        }
      });

      res.cookie('accessToken', newAccessToken, { ...COOKIE_OPTIONS, maxAge: 1 * 60 * 60 * 1000 });
      res.cookie('refreshToken', newRefreshToken, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000 });

      return res.json({ status: 'success' });
    } catch (error: any) {
      return res.status(401).json({ message: 'Session expired' });
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.cookies;

      if (refreshToken) {
        // Revoke the session in DB (Blacklisting)
        await prisma.session.updateMany({
          where: { refreshToken },
          data: { isRevoked: true }
        });
      }

      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      return res.json({ status: 'success', message: 'Logged out successfully' });
    } catch (error: any) {
      return sendError(res, error, 500, 'Logout failed');
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

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpHash = await bcrypt.hash(otp, 10);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await prisma.user.update({
        where: { id: user.id },
        data: { otp: otpHash, otpExpiresAt: expiresAt }
      });

      return res.json({
        status: 'success',
        message: 'OTP sent successfully'
      });
    } catch (error: any) {
      return sendError(res, error, 500, 'Failed to start field login');
    }
  };

  verifyFieldOtp = async (req: Request, res: Response) => {
    try {
      const { mobile, otp } = req.body;
      const user = await prisma.user.findUnique({
        where: { mobile },
        include: { role: true }
      });

      const otpMatches = user?.otp ? await bcrypt.compare(otp, user.otp) : false;
      if (!user || !user.otp || !otpMatches || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
        return res.status(401).json({ message: 'Invalid or expired OTP' });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { otp: null, otpExpiresAt: null }
      });

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role.code,
      };

      const { accessToken, refreshToken } = this.generateTokens(payload);

      await prisma.session.create({
        data: {
          userId: user.id,
          token: accessToken,
          refreshToken: refreshToken,
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'] || '',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }
      });

      res.cookie('accessToken', accessToken, { ...COOKIE_OPTIONS, maxAge: 1 * 60 * 60 * 1000 });
      res.cookie('refreshToken', refreshToken, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000 });

      return res.json({
        status: 'success',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role.code,
        }
      });
    } catch (error: any) {
      return sendError(res, error, 500, 'Failed to verify OTP');
    }
  };

  getMenus = async (req: Request, res: Response) => {
    try {
      const { id: userId, role: roleCode } = (req as any).user;

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
      return sendError(res, error, 500, 'Failed to load menus');
    }
  };
}
