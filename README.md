# Ecommerce UIS

## Estado
Frontend mínimo con React + Vite. Lo que hay por ahora es la estructura y un ejemplo básico.

## Requisitos
- Node.js (versión moderna)
- npm (o yarn / pnpm)

## Instalación
Instala dependencias:

```bash
npm install
```

## Ejecutar en desarrollo
Arranca el servidor de desarrollo (Vite, con HMR):
```
npm run dev
```

## Archivos relevantes

- Configuración Vite: `EcommerceUIS/vite.config.js`
- Punto de entrada HTML: `EcommerceUIS/index.html`
- Entrada React: `EcommerceUIS/src/main.jsx`
- Componente principal: `EcommerceUIS/src/App.jsx`
- Estilos globales: `EcommerceUIS/src/index.css`
- Estilos de App: `EcommerceUIS/src/App.css`
- Configuración ESLint: `EcommerceUIS/eslint.config.js`
- Ignorados por Git: `EcommerceUIS/.gitignore`

**Nota rápida:**  
El HTML carga el bundle desde `/src/main.jsx` (`EcommerceUIS/index.html` → `EcommerceUIS/src/main.jsx`).  
La app de ejemplo está en `EcommerceUIS/src/App.jsx`.
