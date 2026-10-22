# FluneXy - Frontend React

Migracion del frontend estatico (`../frontend/`) a React + Vite + React Router.
El frontend viejo se mantiene como referencia visual hasta terminar la migracion.

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

En desarrollo, las peticiones a `/api` se envian al backend Django en
`http://localhost:8000` (ver `vite.config.js`).

## Estilos

Los CSS de `src/estilos/` son copia exacta de los del frontend viejo y no se
modifican. Cada pagina pone su clase `mod-*` en el `<body>` con el hook
`useClaseBody`, igual que hacian los HTML originales.
