import express from 'express';
import request from 'supertest';
import { body } from 'express-validator';
import { validate } from '../src/middleware/validate.middleware';
import { sendError } from '../src/utils/error-response';

describe('phase 2 validation and error hardening', () => {
  it('rejects invalid request bodies before controllers run', async () => {
    const app = express();
    app.use(express.json());
    const controller = jest.fn((_req, res) => res.status(200).json({ ok: true }));

    app.post('/login', validate([
      body('mobile').isString().trim().matches(/^[0-9]{10,15}$/),
    ]), controller);

    const response = await request(app)
      .post('/login')
      .send({ mobile: 'not-a-phone-number' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation failed');
    expect(controller).not.toHaveBeenCalled();
  });

  it('returns sanitized error messages to API callers', () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    sendError(res, new Error('database password appeared in internal stack'), 500, 'Failed to load resource');

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Failed to load resource',
    });
  });
});
