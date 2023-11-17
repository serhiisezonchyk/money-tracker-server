import { Router } from 'express';
import * as expenceController from '../controllers/expence.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { expenceValidation } from '../validators/index.js';

const router = Router();

/**
 * @openapi
 * /api/expence:
 *   get:
 *     tags:
 *       - Expence
 *     summary: Get all expenses
 *     description: Retrieve a list of all expenses for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response. Returns a list of expenses.
 *       401:
 *         description: Unauthorized Error
 */

router.get('/', authMiddleware, expenceController.getAll);
/**
 * @openapi
 * /api/expence:
 *   post:
 *     tags:
 *       - Expence
 *     summary: Create Expense
 *     description: Create a new expense for the authenticated user
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
 *         description: Expense created successfully
 *       400:
 *         description: BadRequestError
 *       401:
 *         description: Unauthorized Error
 */
router.post(
  '/',
  authMiddleware,
  validationMiddleware(expenceValidation),
  expenceController.create
);

export default router;
