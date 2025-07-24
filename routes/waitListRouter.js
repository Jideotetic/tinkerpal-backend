/**
 * @swagger
 * tags:
 *   name: Wait List
 *   description: Wait list management APIs
 */

/**
 * @swagger
 * /join-waitlist:
 *   post:
 *     summary: Add contact to wait list and send a thank you mail
 *     tags: [Wait List]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - skills
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 example: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: string
 *                 minItems: 1
 *                 description: Must include at least one non-empty string
 *               about:
 *                 type: string
 *                 example: string
 *     responses:
 *       200:
 *         description: Contact added to wait list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Contact added to wait list successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */

import { Router } from "express";
import { joinWaitPayloadValidation } from "../middlewares/validations.js";
import { joinWaitList } from "../controllers/waitListController.js";

const waitListRouter = Router();

waitListRouter.post("/", joinWaitPayloadValidation, joinWaitList);

export default waitListRouter;
