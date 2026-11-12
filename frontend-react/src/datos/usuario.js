// Usuario de prueba: el id 1 de bd/02_insert_data.sql (tabla usuarios), dueño
// de los datos del prototipo. Cuando exista el login real vendra de la sesion.
// La contrasena no se guarda aqui: en la BD va cifrada (bcrypt).

let usuario = {
  id: 1,
  nombre: 'Ana Milena',
  apellido: 'Sierra',
  correo: 'anamilena@ejemplo.com',
  fechaRegistro: '2025-01-12',
  activo: true,
}

export function obtenerUsuario() {
  return usuario
}

// "AS" para el avatar.
export const iniciales = ({ nombre, apellido }) => `${nombre.trim()[0] ?? ''}${apellido.trim()[0] ?? ''}`.toUpperCase()

export function actualizarUsuario(cambios) {
  usuario = { ...usuario, ...cambios }
}

export function desactivarCuenta() {
  usuario = { ...usuario, activo: false }
}
