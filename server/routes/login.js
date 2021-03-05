import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const router = Router();

router
  .route('/')
  .get(LoginController.apiConnect);

export default router;