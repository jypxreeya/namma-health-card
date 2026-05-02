import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export const validate = (rules: ValidationChain[]) => [
  ...rules,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array().map((error) => ({
          field: error.type === 'field' ? error.path : 'request',
          message: error.msg,
        })),
      });
    }
    next();
  },
];
