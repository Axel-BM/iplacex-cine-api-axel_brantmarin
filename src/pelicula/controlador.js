import { ObjectId } from 'mongodb';
import { getCollection, PELICULA_COL } from '../common/db.js';
import { Pelicula } from './pelicula.js';

export const peliculaCollection = PELICULA_COL;

export async function handleInsertPeliculaRequest(req, res) {
    try {
        const doc = Pelicula(req.body);

        if (!doc.nombre || !doc.anioEstreno) {
            return res.status(400).json({ error: 'nombre y anioEstreno se deben ingresar' });
        }
        await getCollection(peliculaCollection)
            .insertOne(doc)
            .then(r => res.status(201).json({ _id: r.insertedId, ...doc }))
            .catch(e => res.status(500).json({ error: e.message }));
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}


export async function handleGetPeliculasRequest(_req, res) {
    try {
        await getCollection(peliculaCollection)
        .find()
        .toArray()
        .then(list => res.status(200).json(list))
        .catch(e => res.status(500).json({ error: e.message }));
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

export async function handleGetPeliculaByIdRequest(req, res) {
    try {
        let _id;
        try {
        _id = ObjectId.createFromHexString(req.params.id);
        } catch {
        return res.status(400).json({ error: 'ID con errores o no encontrado' });
        }

        await getCollection(peliculaCollection)
        .findOne({ _id })
        .then(doc => {
            if (!doc) return res.status(404).json({ error: 'No se puede encontrar' });
            return res.status(200).json(doc);
        })
        .catch(e => res.status(500).json({ error: e.message }));
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}


export async function handleUpdatePeliculaByIdRequest(req, res) {
    try {
        let _id;
        try {
        _id = ObjectId.createFromHexString(req.params.id);
        } catch {
        return res.status(400).json({ error: 'ID con errores o no encontrado' });
        }

        const set = Pelicula(req.body);

        await getCollection(peliculaCollection)
        .updateOne({ _id }, { $set: set })
        .then(r => {
            if (r.matchedCount === 0) {
            return res.status(404).json({ error: 'No se puede encontrar' });
            }
            return res.status(200).json({
            matched: r.matchedCount,
            modified: r.modifiedCount
            });
        })
        .catch(e => res.status(500).json({ error: e.message }));
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}


export async function handleDeletePeliculaByIdRequest(req, res) {
    try {
        let _id;
        try {
        _id = ObjectId.createFromHexString(req.params.id);
        } catch {
        return res.status(400).json({ error: 'ID con errores o no encontrado' });
        }

        await getCollection(peliculaCollection)
        .deleteOne({ _id })
        .then(r => {
            if (!r.deletedCount) {
            return res.status(404).json({ error: 'No se puede eliminar' });
            }
            return res.status(200).json({ deleted: 1 });
        })
        .catch(e => res.status(500).json({ error: e.message }));
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
