# GuardiaAPP — Chofer + Garita (RFS)

Prototipo combinado: el chofer se registra por turno y el guardia valida la cola de poncheos.

Repositorio: [Liskeyla/GuardiaAPP](https://github.com/Liskeyla/GuardiaAPP)

## Rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Selector: Soy chofer / Soy guardia |
| `/chofer` | Registro del conductor |
| `/garita` | Menú pilcoportero 1.6.1 |
| `/garita/cola` | Cola de pendientes (inicio del guardia) |

## Demo

1. Abre `/garita/cola` en una pestaña (sesión RFS 1: 5 camiones).
2. En otra pestaña del **mismo navegador**, abre `/chofer`, cambia el WiFi a RFS 1 si hace falta, y confirma un turno.
3. En menos de 3 segundos aparece en la cola. **VALIDAR Y DAR INGRESO** es un toque; el chofer ve AUTORIZADO sin recargar.

Los datos viven en `localStorage` (`rfs_pendientes_v2`). Solo se sincronizan en el mismo navegador y dispositivo. Entre dos equipos hace falta un backend.

## Local

```bash
npm install
npm run dev
```

## Vercel

Framework Vite. Build `npm run build`. Output `dist`. `vercel.json` ya reescribe las rutas al `index.html`.
