# FluneXy

FluneXy es una plataforma web responsive para la gestion de finanzas personales.

Este repositorio contiene el frontend actual (HTML, CSS y JavaScript) y la
estructura inicial del backend (Django + Django REST Framework).

## Estructura general

```text
FluneXy-Web/
├── frontend/        interfaz web actual (HTML, CSS, JS y assets)
├── backend/         API REST (Django + DRF), estructura inicial
├── docs/            documentacion del proyecto
├── .gitignore
├── .env.example
├── README.md
└── requirements.txt
```

## Frontend

Construido actualmente con HTML, CSS y JavaScript. Contiene la landing
(`index.html`), las 74 paginas de los modulos en `pages/`, los estilos en
`assets/css/` y `components/`, y los recursos en `media/`.

Las rutas internas de los HTML son **relativas**, por lo que el frontend
funciona con cualquier raiz de servidor, y tambien abriendo un HTML
directamente con doble clic. Con Live Server (VS Code) basta con abrir
`frontend/index.html`; no hace falta configurar nada.

La migracion a **React + Vite + Bootstrap** esta prevista para una etapa
posterior; en esta etapa el frontend no fue migrado, y el unico cambio
aplicado fue pasar las rutas de absolutas a relativas.

## Backend

Python + Django + Django REST Framework, con autenticacion JWT prevista
(SimpleJWT). Los 17 modulos funcionales de FluneXy tienen su estructura base
creada en `backend/apps/`, sin logica implementada todavia.

Ver [backend/README.md](backend/README.md) para el detalle y la puesta en marcha.

## Base de datos

**PostgreSQL**. La configuracion se lee desde variables de entorno
(ver `.env.example`). SQLite no esta configurado ni se utiliza.

## Documentacion

En [docs/](docs/). La estructura real de carpetas esta documentada en
[docs/estructura-proyecto.md](docs/estructura-proyecto.md).

## Tecnologias

| Area | Tecnologia |
|---|---|
| Frontend actual | HTML, CSS, JavaScript |
| Frontend previsto | React + Vite + Bootstrap |
| Backend | Python, Django, Django REST Framework |
| Base de datos | PostgreSQL |
| Autenticacion | JWT (SimpleJWT) |
| Asistente inteligente | LLM via OpenRouter (previsto) |
| Reportes PDF | ReportLab (previsto) |
| Reportes Excel | OpenPyXL (previsto) |
| Control de versiones | Git / GitHub |
