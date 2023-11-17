import { Router } from 'express';
import authRouter from './auth.route.js';
import expenceRouter from './expence.route.js';
import incomeRouter from './income.route.js';

const router = new Router();
router.use('/user', authRouter);
router.use('/expence', expenceRouter);
router.use('/income', incomeRouter);

export default router;
