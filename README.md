# Chat colaborativo - Frontend

## 1. Descripcion
Este repositorio contiene la aplicacion web del chat colaborativo en tiempo real.

Responsabilidades principales:
- login con Google
- manejo de sesion local (token + usuario)
- conexion WebSocket al backend
- render de historial y mensajes en vivo
- actualizacion de alias visible del usuario
- UI del chat, sidebar de perfil y cierre de sesion

## 2. Tecnologias utilizadas
- React
- Vite
- Tailwind CSS
- React Router
- `@react-oauth/google`
- WebSocket nativo del navegador

## 3. Estructura de carpetas
```text
activity_7F/
├─ public/
├─ src/
│  ├─ context/
│  │  └─ AuthContext.jsx
│  ├─ Modules/
│  │  ├─ Chat/
│  │  │  ├─ api/chatSocket.js
│  │  │  ├─ hooks/useChat.js
│  │  │  └─ Chat.jsx
│  │  ├─ Home/
│  │  │  ├─ api/homeApi.js
│  │  │  ├─ hooks/useHome.js
│  │  │  ├─ components/sidebar/
│  │  │  └─ Home.jsx
│  │  ├─ Login/Login.jsx
│  │  └─ NotFound.jsx
│  ├─ routes/
│  │  ├─ AppRouter.jsx
│  │  ├─ ProtectedRoute.jsx
│  │  └─ PublicRoute.jsx
│  ├─ App.jsx
│  └─ main.jsx
├─ .env.example
└─ package.json
```

## 4. Instalacion y ejecucion local
Requisitos:
- Node.js 18+ (recomendado)
- backend ejecutandose en paralelo

Pasos:
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```
3. Abrir la URL que entrega Vite (normalmente `http://localhost:5173`).

## 5. Flujo funcional
1. El usuario entra a `/login` y se autentica con Google.
2. `Login.jsx` envia `credential` al backend (`/api/auth/google`).
3. `AuthContext` guarda token/usuario en `localStorage`.
4. `ProtectedRoute` habilita acceso a `/`.
5. `useChat` abre WebSocket a `/ws/chat?token=...`.
6. El backend envia historial (`history`) y luego mensajes/eventos en tiempo real.
7. El usuario puede:
   - enviar mensaje (`type: message`)
   - actualizar alias (`type: alias:update`)
8. El frontend:
   - agrega mensajes entrantes
   - refleja cambios de alias del usuario en UI
   - muestra eventos del sistema como toast
   - hace scroll automatico al final del chat

## 6. Rutas de la aplicacion
- `/login`: acceso publico para autenticacion.
- `/`: vista principal (protegida).
- `*`: pagina de no encontrado.

## 7. Eventos WebSocket usados en frontend
Entradas:
- `history`
- `message`
- `alias:updated`
- `system`

Salidas:
- `message`
- `alias:update`

## 8. Scripts
- `npm run dev`: servidor de desarrollo Vite.
- `npm run build`: build de produccion.
- `npm run preview`: preview local del build.
- `npm run lint`: lint del codigo.

## 9. Prueba manual recomendada
1. Levantar backend (`activity_7B`) y frontend (`activity_7F`).
2. Abrir dos navegadores/sesiones con cuentas distintas.
3. Verificar:
   - ambos reciben historial inicial
   - mensajes aparecen en tiempo real
   - al cambiar alias en un cliente, se actualiza en ambos
   - al cerrar una sesion o pestaña, aparece evento de salida
