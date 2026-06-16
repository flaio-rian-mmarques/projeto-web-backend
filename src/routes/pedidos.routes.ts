import { Router } from "express";
import { criarPedido, pagarPedido } from "../controllers/pedidos.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

export const pedidosRoutes = Router();

pedidosRoutes.patch('/:id/pagar', auth, pagarPedido);
pedidosRoutes.post('/', auth, criarPedido);