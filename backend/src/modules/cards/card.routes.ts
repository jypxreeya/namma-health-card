import { Router } from 'express';
import { prisma } from '../../config/prisma';

const router = Router();

router.get('/:cardNumber', async (req, res) => {
  try {
    const { cardNumber } = req.params;
    const card = await prisma.healthCard.findUnique({
      where: { cardNumber },
      include: {
        membership: {
          include: { patient: true }
        }
      }
    });

    if (!card) {
      return res.status(404).json({ status: 'error', message: 'Card not found' });
    }

    res.status(200).json({ status: 'success', data: card });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export { router as cardRouter };
