import express from 'express';

const app = express();
const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`🔥 O monstro tá saindo da jaulaaa, olha a porta: ${PORTA}!`);
});

app.use(express.json());

import { usuariosRoutes } from './routes/usuarios.routes.js';
app.use('/api/usuarios', usuariosRoutes);

