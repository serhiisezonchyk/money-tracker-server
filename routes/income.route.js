import { Router } from 'express';
import * as incomeController from '../controllers/income.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { incomeValidation } from '../validators/index.js';

const router = Router();

/**
 * @openapi
 * /api/income:
 *   get:
 *     tags:
 *       - Income
 *     summary: Get all incomes
 *     description: Retrieve a list of all incomes for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response. Returns a list of incomes.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    title:
 *                      type: string
 *                    amount:
 *                      type: string
 *                    description:
 *                      type: string
 *                    category:
 *                      type: integer
 *                    created_at:
 *                      type: string
 *                    updated_at:
 *                      type: string
 *                    user_id:
 *                      type: string
 *       401:
 *         description: Unauthorized Error
 */
router.get('/', authMiddleware, incomeController.getAll);

/**
 * @openapi
 * /api/income:
 *   post:
 *     tags:
 *       - Income
 *     summary: Create Income
 *     description: Create a new income for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: integer
 *             required:
 *               - title
 *               - amount
 *     responses:
 *       201:
 *         description: Income created successfully
 *       400:
 *         description: Bad Request Error
 *       401:
 *         description: Unauthorized Error
 */
router.post(
  '/',
  authMiddleware,
  validationMiddleware(incomeValidation),
  incomeController.create
);

export default router;
