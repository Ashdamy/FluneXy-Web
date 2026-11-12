export default [
  { nombre: 'Mis Plantillas', ruta: '/plantillas', titulo: 'Mis Plantillas', body: 'mod-plantillas', h1: 'Mis Plantillas', js: `ok('tarjetas', $$('.card-plantilla').length >= 4, $$('.card-plantilla').length)
ok('menú marca Plantillas', txt('.navegacion-barra a.activo') === 'Plantillas')` },
  { nombre: 'Nueva plantilla', ruta: '/plantillas/nueva?tipo=gasto', titulo: 'Nueva Plantilla', body: 'mod-plantilla-form mod-plantilla-crear', h1: 'Nueva Plantilla' },
  { nombre: 'Detalle plantilla', ruta: '/plantillas/1', titulo: 'Detalle de Plantilla', body: 'mod-plantilla-detalle' },
  { nombre: 'Editar plantilla', ruta: '/plantillas/1/editar', titulo: 'Editar Plantilla', body: 'mod-plantilla-form mod-plantilla-editar', h1: 'Editar Plantilla' },
]
