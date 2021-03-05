import { Router } from 'express';

import apiConnection from './apiConnection';

const router = Router();

router.use('/api-connection', apiConnection);

export default router;