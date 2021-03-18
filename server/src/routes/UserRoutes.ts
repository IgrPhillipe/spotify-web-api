import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.route('/')
  .get(UserController.getUser);

export default router;
