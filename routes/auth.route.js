import { Router } from 'express';
import * as userController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { registerValidation } from '../validators/index.js';
const router = Router();

/**
 * @openapi
 * /api/user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               check_password:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - login
 *               - email
 *               - password
 *               - check_password
 *               - name
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request Error
 */
router.post(
  '/register',
  validationMiddleware(registerValidation),
  userController.create
);

/**
 * @openapi
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: User login
 *     description: Authenticate user and generate a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 default: Sergey
 *               password:
 *                 type: string
 *                 default: 123456
 *             required:
 *               - login
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized Error
 */
router.post('/login', userController.login);

/**
 * @openapi
 * /api/user/auth:
 *   get:
 *     tags:
 *       - User
 *     summary: Check user authentication
 *     description: Verify the authentication token of the user
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: Unauthorized Error
 */

router.get('/auth', authMiddleware, userController.check);

export default router;
