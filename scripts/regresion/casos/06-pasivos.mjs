export default [
  { nombre: 'Mis Pasivos', ruta: '/pasivos', titulo: 'Mis Pasivos', body: 'mod-lista-pasivos', h1: 'Mis Pasivos', js: `ok('4 tarjetas', $$('.tarjeta-deuda').length === 4)
ok('menú marca Pasivos', txt('.navegacion-barra a.activo') === 'Pasivos')` },
  { nombre: 'Registrar pasivo', ruta: '/pasivos/nuevo', titulo: 'Registrar Pasivo', body: 'mod-pasivo-form mod-pasivo-crear', h1: 'Registrar Pasivo' },
  { nombre: 'Detalle pasivo', ruta: '/pasivos/1', titulo: 'Detalle del Pasivo', body: 'mod-pasivo-detalle', h1: 'Detalle del Pasivo' },
  { nombre: 'Editar pasivo', ruta: '/pasivos/1/editar', titulo: 'Editar Pasivo', body: 'mod-pasivo-form mod-pasivo-editar', h1: 'Editar Pasivo' },
  { nombre: 'Editar pasivo inactivo', ruta: '/pasivos/4/editar', redirige: '/pasivos/4' },
]
