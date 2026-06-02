import express from 'express';
import cors from 'cors';
import { usuariosRoutes } from './routes/usuarios.routes.js';

const app = express();
const PORTA = 3000;

app.use(cors());

app.listen(PORTA, () => {
    console.log(`🔥 O monstro tá saindo da jaulaaa, olha a porta: ${PORTA}!`);
});

app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
