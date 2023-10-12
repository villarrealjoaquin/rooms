import { Router } from "express";
import {
  login,
  register,
  verifyToken
} from "../controllers/auth.controller";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyToken);

export default router;