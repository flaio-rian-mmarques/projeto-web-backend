import { Router } from "express";
import { listarTodosServicos, deletarServico } from "../controllers/admin.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { somenteAdmin } from "../middlewares/authAdm.middleware.js";

export const adminRoutes = Router();

adminRoutes.get('/servicos', auth, somenteAdmin, listarTodosServicos);
adminRoutes.delete('/servicos/:id', auth, somenteAdmin, deletarServico);