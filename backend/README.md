# Backend de FluneXy

API REST de FluneXy construida con Python, Django y Django REST Framework.

En esta etapa solo existe la **estructura**: no hay logica de negocio, modelos,
endpoints ni autenticacion funcional implementados.

## Estructura

```text
backend/
├── manage.py
├── config/            configuracion del proyecto (settings, urls, wsgi, asgi)
├── core/              elementos compartidos entre modulos
├── apps/              los 17 modulos funcionales (MOD01 - MOD17)
├── requirements.txt
├── .env.example
└── README.md
```

## Base de datos

PostgreSQL. SQLite no esta configurado ni se utiliza en este proyecto.

## Puesta en marcha (cuando se empiece a desarrollar)

```bash
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
copy .env.example .env         # y completar los valores
python manage.py migrate
python manage.py runserver
```

## Modulos

| Modulo | App |
|---|---|
| MOD01 Autenticacion | `apps/autenticacion/` |
| MOD02 Usuario | `apps/usuarios/` |
| MOD03 Categorias | `apps/categorias/` |
| MOD04 Fondos | `apps/fondos/` |
| MOD05 Movimientos | `apps/movimientos/` |
| MOD06 Plantillas Automaticas de Movimientos | `apps/plantillas_movimiento/` |
| MOD07 Activos | `apps/activos/` |
| MOD08 Pasivos | `apps/pasivos/` |
| MOD09 Metas | `apps/metas/` |
| MOD10 Cuotas | `apps/cuotas/` |
| MOD11 Pagos | `apps/pagos/` |
| MOD12 Flujo de Caja | `apps/flujo_caja/` |
| MOD13 Balance Financiero | `apps/balance_financiero/` |
| MOD14 Indicadores Financieros | `apps/indicadores/` |
| MOD15 Alertas | `apps/alertas/` |
| MOD16 Reportes | `apps/reportes/` |
| MOD17 Asistente Inteligente | `apps/asistente_inteligente/` |
