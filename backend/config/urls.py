"""Rutas raiz del backend de FluneXy.

Cada modulo expone sus rutas bajo /api/. Los urlpatterns de cada modulo
estan todavia vacios: aqui solo queda definido el mapa de la API.
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("apps.autenticacion.urls")),
    path("api/usuarios/", include("apps.usuarios.urls")),
    path("api/categorias/", include("apps.categorias.urls")),
    path("api/fondos/", include("apps.fondos.urls")),
    path("api/movimientos/", include("apps.movimientos.urls")),
    path("api/plantillas-movimiento/", include("apps.plantillas_movimiento.urls")),
    path("api/activos/", include("apps.activos.urls")),
    path("api/pasivos/", include("apps.pasivos.urls")),
    path("api/metas/", include("apps.metas.urls")),
    path("api/cuotas/", include("apps.cuotas.urls")),
    path("api/pagos/", include("apps.pagos.urls")),
    path("api/flujo-caja/", include("apps.flujo_caja.urls")),
    path("api/balance-financiero/", include("apps.balance_financiero.urls")),
    path("api/indicadores/", include("apps.indicadores.urls")),
    path("api/alertas/", include("apps.alertas.urls")),
    path("api/reportes/", include("apps.reportes.urls")),
    path("api/asistente/", include("apps.asistente_inteligente.urls")),
]
