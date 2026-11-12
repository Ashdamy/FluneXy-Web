export default [
  { nombre: 'Mis Alertas', viejo: 'pages/alertas/lista-alertas.html', nuevo: '/alertas' },
  { nombre: 'Desactivar (modal)', viejo: 'pages/alertas/desactivar-alerta.html', nuevo: '/alertas', antes: `clic($('.alerta-tarjeta [title="Desactivar"]')); await espera(() => $('.overlay-alerta-modal'))` },
  { nombre: 'Nueva Alerta', viejo: 'pages/alertas/configurar-alerta.html', nuevo: '/alertas/nueva' },
  { nombre: 'Editar Alerta', viejo: 'pages/alertas/editar-alerta.html', nuevo: '/alertas/1/editar' },
  { nombre: 'Detalle', viejo: 'pages/alertas/detalle-alerta.html', nuevo: '/alertas/1' },
  { nombre: 'Historial', viejo: 'pages/alertas/historial-alertas.html', nuevo: '/alertas/historial' },
]
