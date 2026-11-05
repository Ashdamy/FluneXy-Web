// RN01.3.5 y RN02.1.2: minimo 8 caracteres, con mayuscula, minuscula, numero y caracter especial.
export const PATRON_CONTRASENA = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}'
export const AYUDA_CONTRASENA = 'Mínimo 8 caracteres, con mayúscula, minúscula, número y carácter especial.'

// RN04.1.1, RN07.1.2 y RN08.1.1: el nombre no se repite entre los registros del
// usuario, tambien los inactivos. "idActual" excluye al que se esta editando.
export function nombreRepetido(lista, nombre, idActual) {
  const buscado = nombre.trim().toLowerCase()
  return lista.some((item) => item.id !== idActual && item.nombre.trim().toLowerCase() === buscado)
}
