export const Actor = ({ idPelicula, nombre, edad, estaRetirado = false, premios = [] }) => ({
    idPelicula: idPelicula ? String(idPelicula) : undefined,
    nombre: String(nombre ?? '').trim(),
    edad: Number.isInteger(edad) ? edad : undefined,
    estaRetirado: Boolean(estaRetirado),
    premios: Array.isArray(premios) ? premios.map(String) : []
});
