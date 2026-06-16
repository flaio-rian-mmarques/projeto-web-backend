import { Router } from 'express';
import { criarServico } from '../controllers/servicos.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

export const servicosRoutes = Router();
servicosRoutes.post('/', auth, criarServico);
