# GuardiaAPP — Cola de poncheos (RFS)

App del guardia de garita. El registro del chofer vive aparte, en [Poncheo Digital](https://github.com/Liskeyla/PoncheoDigital).

## Rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Redirige a la cola |
| `/garita/cola` | Poncheos por validar (inicio) |
| `/garita` | Menú pilcoportero 1.6.1 |

## Demo

La cola arranca en **RFS 1** (5 camiones). Cambia la sesión en **MENÚ** a RFS 2 o RFS 3.

- Un toque en **VALIDAR Y DAR INGRESO** autoriza.
- **Rechazar este ingreso** + el motivo (dos toques).
- **DESHACER** durante 5 segundos.

## Local

```bash
npm install
npm run dev
```

## Vercel

https://guardia-app-nine.vercel.app
