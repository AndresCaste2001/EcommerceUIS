# Ecommerce UIS

Aplicación full‑stack (monorepo) con un cliente React + Vite y un servidor Express. Este documento explica la estructura del proyecto, requisitos, instalación y cómo iniciarlo en desarrollo.

## Tabla de contenido
- Descripción general
- Estructura del proyecto
- Requisitos previos
- Instalación
- Variables de entorno
- Cómo iniciar (desarrollo)
- Construcción y ejecución (producción o preview)
- Scripts útiles
- Solución de problemas

## Descripción general
Este repositorio contiene:
- Frontend (cliente) en `React 18` con `Vite` y `react-router-dom`.
- Backend (servidor) con `Express` y `dotenv`, preparado para CORS.
- Scripts para ejecutar cliente y servidor en paralelo con `concurrently`.

## Estructura del proyecto
```
EcommerceUIS/                  # Monorepo principal (donde están los scripts)
├── client/                    # Frontend (React + Vite)
│   ├── package.json
│   └── src/
└── server/                    # Backend (Express)
    ├── package.json
    └── src/server.js

README.md                      # Este archivo (en la raíz del repo Git)
```

## Requisitos previos
- Node.js 18 o superior (recomendado LTS)
- npm 9+ (o yarn/pnpm si lo prefieres; los scripts aquí usan npm)

Verifica tus versiones:
- node -v
- npm -v

## Instalación
1) Entra al directorio del monorepo:
- cd EcommerceUIS

2) Instala todas las dependencias (raíz, cliente y servidor) con un solo comando:
- npm run install-all

También puedes instalarlas por separado si lo prefieres:
- npm install            # en EcommerceUIS/
- cd client && npm install
- cd ../server && npm install

## Variables de entorno
Servidor (Express):
- Archivo: EcommerceUIS/server/.env (opcional)
- Variables soportadas:
  - PORT: Puerto de escucha del servidor. Por defecto 5000.

Ejemplo de .env:
- PORT=5000

Cliente (Vite):
- Si necesitas configurar una URL de API, puedes definir variables que comiencen con VITE_. Ejemplo:
  - VITE_API_BASE_URL=http://localhost:5000
- Archivo: EcommerceUIS/client/.env (opcional)

Nota: En el código actual no se requiere ninguna variable obligatoria para arrancar en desarrollo.

## Cómo iniciar (desarrollo)
Opción A — Todo junto (cliente + servidor en paralelo):
1) Desde EcommerceUIS/ ejecuta:
- npm run dev
2) Esto inicia:
- Servidor Express en http://localhost:5000 (por defecto)
- Cliente Vite en http://localhost:5173 (puerto por defecto de Vite)

Opción B — Por separado:
- En una terminal: cd EcommerceUIS/server && npm run dev
- En otra terminal: cd EcommerceUIS/client && npm run dev

## Construcción y ejecución (producción o preview)
Frontend:
- cd EcommerceUIS/client
- npm run build           # genera la carpeta dist/
- npm run preview         # sirve estáticamente la build (útil para pruebas locales)

Backend:
- cd EcommerceUIS/server
- npm start               # ejecuta el servidor con Node (sin nodemon)

Nota: El servidor Express actualmente no sirve la build del cliente. Para producción real, se recomienda:
- Servir el frontend en un hosting estático (Netlify, Vercel, S3+CloudFront, etc.)
- Desplegar el backend en un servicio Node (Railway, Render, Fly.io, VPS, etc.)
- Configurar CORS según el dominio del frontend.

## Scripts útiles
En EcommerceUIS/package.json:
- npm run install-all  → Instala dependencias en raíz, client y server
- npm run dev          → Arranca server y client en paralelo (concurrently)
- npm run server       → Sólo servidor en modo desarrollo (nodemon)
- npm run client       → Sólo cliente en modo desarrollo (vite)

En EcommerceUIS/client/package.json:
- npm run dev          → Vite dev server
- npm run build        → Build de producción
- npm run preview      → Servir build localmente

En EcommerceUIS/server/package.json:
- npm run dev          → Server con nodemon
- npm start            → Server con node

## Solución de problemas
- Error "command not found: concurrently": Asegúrate de ejecutar los scripts desde EcommerceUIS/ (donde está package.json con la dependencia de desarrollo concurrently). Si persiste, ejecuta npm install en EcommerceUIS/.
- Puerto en uso (EADDRINUSE): Cambia PORT en EcommerceUIS/server/.env o cierra el proceso que ocupa ese puerto.
- Problemas CORS: Ajusta la configuración de origen del frontend o habilita CORS según sea necesario en el servidor (ya está incluido cors()).
- Variables Vite: Recuerda que deben empezar con VITE_.

---
¿Dudas o sugerencias? Abre un issue o comenta en el repositorio.
