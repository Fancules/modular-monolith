import { Request, Response, Router } from 'express';
import mediator from '../../core/mediator';
import { AddProduct } from './ProductService';

// interface AddProduct {
//     name: string;
//     price: number;
// }

const router = Router();
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product's name.
 *                 example: Smartphone
 *               description:
 *                 type: string
 *                 description: The product's description.
 *                 example: Gadget for making calls
 *     responses:
 *       200:
 *         description: Returns the newly created product.
 *       500:
 *         description: A server error occurred.
 */
router.post('/', async (req: Request, res: Response) => {
    const response = await mediator.send(req.body);
    res.send(response);
});

// router.post('/crossmodulecommunication', (req: Request, res: Response) => {
//     const type = req.query.type;
//     mediator.send(type, req.body);
// })

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a products
 *     description: Returns a list of products.
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 */
router.get('/', async (req: Request, res: Response) => {
    const response = await mediator.send('GetAllProducts');
    res.send(response);
});

export default router;


