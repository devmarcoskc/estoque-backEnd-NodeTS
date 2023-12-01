import express from 'express';
import { getTransactionsHistory } from '../controllers/transactionsHistory';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.get('/:orgaoId', verifyToken, getTransactionsHistory);

export default router;