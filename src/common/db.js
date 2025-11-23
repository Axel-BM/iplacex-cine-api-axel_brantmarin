import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('MONGODB_URI no está en .env o .env no existe');
    process.exit(1);
}
export const DB_NAME = 'cine-db';
export const PELICULA_COL = 'peliculas';
export const ACTOR_COL = 'actores';
let client;

export async function connectClient() {
try {
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
    }
});

    await client.connect();
    await client.db(DB_NAME).command({ ping: 1 });

    console.log('Conectado ala base de datos:', DB_NAME);

} catch (err) {
    console.error('Hay un error y es el siguiente:', err?.message);
    throw err;
}
}

export function getDb() {
    if (!client) throw new Error('MonogoDB no inicia');
    return client.db(DB_NAME);
}

export function getCollection(name) {
    return getDb().collection(name);
}
