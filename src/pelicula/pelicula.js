export const Pelicula = ({ nombre, generos = [], anioEstreno }) => ({
    nombre: String(nombre ?? '').trim(),
    generos: Array.isArray(generos) ? generos.map(String) : [],
    anioEstreno: Number.isInteger(anioEstreno) ? anioEstreno : undefined
});
