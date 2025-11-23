import { ObjectId } from 'mongodb';
import { getCollection, PELICULA_COL, ACTOR_COL } from '../common/db.js';
import { Actor } from './actor.js';

export const actorCollection = ACTOR_COL;


export async function handleInsertActorRequest(req, res) {
    try {
        const { nombrePelicula } = req.body;

        if (!nombrePelicula) {
            return res.status(400).json({ error: 'nombrePelicula debe ser ingresado' });
        }

    const peliculaNombre = String(nombrePelicula).trim();

    await getCollection(PELICULA_COL)
        .findOne({ nombre: peliculaNombre })
        .then(async peli => {
            if (!peli?._id) {
            return res.status(400).json({ error: 'La película no existe' });
            }

            const doc = Actor({
            ...req.body,
            idPelicula: String(peli._id)
            });

            if (!doc.nombre || !doc.edad) {
            return res.status(400).json({ error: 'nombre y edad deben ser ingresados' });
            }

            await getCollection(actorCollection)
            .insertOne(doc)
            .then(r => res.status(201).json({ _id: r.insertedId, ...doc }))
            .catch(e => res.status(500).json({ error: e.message }));
        })
        .catch(e => res.status(500).json({ error: e.message }));
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export async function handleGetActoresRequest(_req, res) {
    try {
        await getCollection(actorCollection)
        .find()
        .toArray()
        .then(list => res.status(200).json(list))
        .catch(e => res.status(500).json({ error: e.message }));
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}


export async function handleGetActorByIdRequest(req, res) {
    try {
        let _id;
        try {
        _id = ObjectId.createFromHexString(req.params.id);
        } catch {
        return res.status(400).json({ error: 'ID con errores o no encontrado' });
        }

        await getCollection(actorCollection)
        .findOne({ _id })
        .then(doc => {
            if (!doc) return res.status(404).json({ error: 'No se encuentre por actor' });
            return res.status(200).json(doc);
        })
        .catch(e => res.status(500).json({ error: e.message }));
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}


export async function handleGetActoresByPeliculaRequest(req, res) {
    try {
        let idPelicula;
        try {
        idPelicula = ObjectId.createFromHexString(req.params.pelicula);
        } catch {
        return res.status(400).json({ error: 'ID con errores o no encontrado' });
        }

        await getCollection(actorCollection)
        .find({ idPelicula: String(idPelicula) })
        .toArray()
        .then(list => res.status(200).json(list))
        .catch(e => res.status(500).json({ error: e.message }));
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
