import jwt from 'jsonwebtoken';
import { getRequiredEnv } from '../src/config/env';
import { authGuard } from '../src/guards/auth.guard';
import { roleGuard } from '../src/guards/role.guard';
import { buildPublicCardVerification } from '../src/modules/cards/card.routes';

function mockResponse() {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('security hardening', () => {
  const previousJwtSecret = process.env.JWT_SECRET;

  afterEach(() => {
    if (previousJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = previousJwtSecret;
    }
    jest.clearAllMocks();
  });

  it('fails fast when JWT_SECRET is missing or too short', () => {
    delete process.env.JWT_SECRET;
    expect(() => getRequiredEnv('JWT_SECRET')).toThrow('Missing required environment variable');

    process.env.JWT_SECRET = 'short';
    expect(() => getRequiredEnv('JWT_SECRET')).toThrow('must be at least 32 characters');
  });

  it('rejects tokens signed with the old fallback secret', () => {
    process.env.JWT_SECRET = 'a'.repeat(32);
    const forgedToken = jwt.sign({ id: 'user-1', role: 'SUPER_ADMIN' }, 'secret');
    const req: any = {
      cookies: {},
      headers: { authorization: `Bearer ${forgedToken}` },
    };
    const res = mockResponse();
    const next = jest.fn();

    authGuard(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('allows only configured roles through roleGuard', () => {
    const guard = roleGuard(['SUPER_ADMIN', 'ADMIN']);
    const res = mockResponse();
    const next = jest.fn();

    guard({ user: { role: 'FIELD_EXECUTIVE' } } as any, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it('keeps public card verification free of patient PII', () => {
    const future = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const response = buildPublicCardVerification({
      cardNumber: 'CARD-123',
      cardStatus: 'ACTIVE',
      expiryDate: future,
      membership: {
        status: 'ACTIVE',
        validTo: future,
        membershipPlan: { planName: 'Family Plan' },
      },
    });

    expect(response).toEqual({
      cardNumber: 'CARD-123',
      cardStatus: 'ACTIVE',
      isValid: true,
      expiryDate: future,
      membershipStatus: 'ACTIVE',
      planName: 'Family Plan',
    });
    expect(response).not.toHaveProperty('patient');
    expect(response).not.toHaveProperty('mobile');
    expect(response).not.toHaveProperty('email');
  });
});
