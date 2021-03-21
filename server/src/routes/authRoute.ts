import express from 'express';

import AuthController from '../controllers/AuthController';

const router = express.Router();

router
  .route('/')
  .get(AuthController.authenticate);

router
  .route('/callback')
  .get(AuthController.callback);

export default router;
