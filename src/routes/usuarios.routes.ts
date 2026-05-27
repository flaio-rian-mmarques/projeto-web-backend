import { Router } from 'express';
import { cadastrarUsuario, fazerLogin } from '../controllers/usuarios.controller.js';

export const usuariosRoutes = Router();

usuariosRoutes.post('/cadastro', cadastrarUsuario);
usuariosRoutes.post('/login', fazerLogin);