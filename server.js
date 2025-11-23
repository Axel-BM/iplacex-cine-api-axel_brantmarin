import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectClient } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/route.js';
import actorRoutes from './src/actor/route.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (_req, res) => {
    res.status(200).send('Acceso correcto');
});

app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

try {
    await connectClient();
    app.listen(PORT, () => {
        console.log(`Servidor funciona en el enlace http://localhost:${PORT}`);
    });
} catch (err) {
    console.error('No se pudo iniciar por lo siguiente:', err?.message);
    process.exit(1);
}
