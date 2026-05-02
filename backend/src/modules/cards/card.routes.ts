import { Request, Response, Router } from 'express';
import { prisma } from '../../config/prisma';
import { sendError } from '../../utils/error-response';
import { validate } from '../../middleware/validate.middleware';
import { param } from 'express-validator';

const router = Router();

type PublicCardVerificationInput = {
  cardNumber: string;
  cardStatus: string;
  expiryDate: Date;
  membership: {
    status: string;
    validTo: Date;
    membershipPlan: {
      planName: string;
    };
  };
};

export function buildPublicCardVerification(card: PublicCardVerificationInput) {
  const now = new Date();
  const isValid =
    card.cardStatus === 'ACTIVE' &&
    card.membership.status === 'ACTIVE' &&
    card.expiryDate >= now &&
    card.membership.validTo >= now;

  return {
    cardNumber: card.cardNumber,
    cardStatus: card.cardStatus,
    isValid,
    expiryDate: card.expiryDate,
    membershipStatus: card.membership.status,
    planName: card.membership.membershipPlan.planName,
  };
}

/**
 * @swagger
 * /api/cards/{cardNumber}:
 *   get:
 *     summary: Get health card details by card number
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: cardNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Card details
 *       404:
 *         description: Card not found
 */
router.get('/:cardNumber', validate([
  param('cardNumber').isString().trim().isLength({ min: 3, max: 100 }),
]), async (req: Request, res: Response) => {
  try {
    const cardNumber = String(req.params.cardNumber);
    const card = await prisma.healthCard.findUnique({
      where: { cardNumber },
      include: {
        membership: {
          include: { membershipPlan: { select: { planName: true } } }
        }
      }
    }) as PublicCardVerificationInput | null;

    if (!card) {
      return res.status(404).json({ status: 'error', message: 'Card not found' });
    }

    res.status(200).json({
      status: 'success',
      data: buildPublicCardVerification(card)
    });
  } catch (error: any) {
    return sendError(res, error, 500, 'Failed to verify card');
  }
});

export { router as cardRouter };
