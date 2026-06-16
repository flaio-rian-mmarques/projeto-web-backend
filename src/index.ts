import express from 'express';
import cors from 'cors';
import { usuariosRoutes } from './routes/usuarios.routes.js';
import { servicosRoutes } from './routes/servicos.routes.js';
import { pedidosRoutes } from './routes/pedidos.routes.js';
import { adminRoutes } from './routes/admin.routes.js';


const app = express();
const PORTA = 3000;

app.use(cors());


app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/servicos', servicosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/admin', adminRoutes);


app.listen(PORTA, () => {
    console.log(`🔥 O monstro tá saindo da jaulaaa, olha a porta: ${PORTA}!`);
});
