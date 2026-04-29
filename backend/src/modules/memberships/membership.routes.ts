import { Router } from 'express';
import { prisma } from '../../config/prisma';

const router = Router();

router.get('/plans', async (req, res) => {
  try {
    const plans = await prisma.membershipPlan.findMany();
    res.status(200).json({ status: 'success', data: plans });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export { router as membershipRouter };
