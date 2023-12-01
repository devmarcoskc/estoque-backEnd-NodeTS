import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/products';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/', verifyToken, createProduct);
router.get('/:orgaoId', verifyToken, getProducts);
router.patch('/:id', verifyToken, updateProduct);
router.delete('/:id/:orgaoId', verifyToken, deleteProduct);

export default router;