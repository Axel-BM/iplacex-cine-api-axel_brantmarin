import { Router } from 'express';
import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaRequest
} from './controlador.js';

const ActorRoutes = Router();

ActorRoutes.post('/actor', handleInsertActorRequest);
ActorRoutes.get('/actores', handleGetActoresRequest);
ActorRoutes.get('/actor/:id', handleGetActorByIdRequest);
ActorRoutes.get('/actor/pelicula/:pelicula', handleGetActoresByPeliculaRequest);

export default ActorRoutes;
