# Tuten App - Aplicación de Gestión de Bookings

Una aplicación Ionic/Angular para gestión de reservas (bookings) con autenticación de usuario y filtrado dinámico.

## 📄 Documentación Adjunta

Puedes consultar el enunciado completo de la prueba técnica aquí:
* [PDF de Prueba Técnica (GitHub)](https://github.com/user-attachments/files/27739911/Prueba.Tuten.-Angular.6.pdf)
## 📋 Requisitos Previos

- **Node.js** v18+ y npm
- **Angular CLI** instalado globalmente (`npm install -g @angular/cli`)
- **Ionic CLI** instalado globalmente (`npm install -g @ionic/cli`)

## 🚀 Instalación y Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar la aplicación en desarrollo

```bash
npm start
```

o alternativamente:

```bash
ionic serve
```

La aplicación se abrirá en `http://localhost:4200`

### 3. Compilar para producción

```bash
npm run build
```

## 📱 Uso de la Aplicación

### Flujo de Autenticación

1. **Pantalla de Login** (`/login`)
   - Ingresa tu usuario (email): `testapis@tuten.cl`
   - Contraseña: `1234`
   - Click en el botón **"Iniciar Sesión"**
   - Se generará un token de autenticación automáticamente
   - Serás redirigido a la pantalla de Home

### Pantalla de Home - Gestión de Bookings

#### Ver Bookings

- Una vez autenticado, verás un listado de todos los bookings disponibles
- Cada booking muestra:
  - **BookingId**: Identificador único del booking (ej: BK001)
  - **Cliente**: Nombre completo (firstName + lastName)
  - **Fecha de Creación**: Timestamp del booking
  - **Dirección**: Ubicación del servicio
  - **Precio**: Costo del booking (formato moneda)

#### Filtrar Bookings

La aplicación permite filtrar dinámicamente los bookings con las siguientes opciones:

**1. Buscar por BookingId (LIKE)**

- Ingresa parte del ID en el campo "Buscar por BookingId"
- Búsqueda parcial (no necesita coincidir exactamente)
- Ejemplo: escribir "BK0" mostrará BK001, BK002, BK003, etc.

**2. Filtrar por Rango de Precio**

- **Precio Mínimo (>=)**: Muestra bookings con precio mayor o igual al valor ingresado
- **Precio Máximo (<=)**: Muestra bookings con precio menor o igual al valor ingresado
- Puedes usar ambos filtros simultáneamente para un rango específico

**3. Aplicación de Filtros**

- Los filtros se aplican **dinámicamente** conforme escribes
- Todos los filtros son **opcionales** y se pueden combinar
- El contador "Listado de Bookings (X)" muestra cuántos registros coinciden con los filtros

**4. Limpiar Filtros**

- Click en el botón **"Limpiar Filtros"** para resetear todos los filtros
- Se volverá a mostrar el listado completo de bookings

#### Cerrar Sesión

- Click en el botón **"Cerrar Sesión"** para volver a la pantalla de login
- Tu token será eliminado de localStorage

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── app-routing.module.ts       # Configuración de rutas
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── pages/
│   │   └── login/
│   │       ├── login.page.ts       # Componente de login (standalone)
│   │       └── login.page.html
│   └── home/
│       ├── home.page.ts            # Componente principal con lógica de bookings
│       ├── home.page.html          # Template con filtros y grilla
│       ├── home.page.scss
│       └── home.module.ts
├── core/
│   └── services/
│       ├── auth.service.ts         # Servicio de autenticación
│       └── booking.service.ts      # Servicio de gestión de bookings
├── environments/
│   ├── environment.ts              # Configuración de desarrollo
│   └── environment.prod.ts         # Configuración de producción
├── theme/
│   └── variables.scss              # Variables de estilos Ionic
└── index.html

```

## 🔐 Autenticación

### Login

- El servicio de autenticación (`AuthService`) maneja el login
- Genera un token de sesión local (no se requiere servidor externo)
- El token se almacena en `localStorage` con la clave `'token'`
- También se almacena el usuario en `localStorage` con la clave `'user'`

### Validación

- La aplicación verifica el token al cargar la página Home
- Si no hay token válido, te redirige automáticamente a la pantalla de login

## 📊 Servicios Disponibles

### AuthService (`src/core/services/auth.service.ts`)

- `login(user: string, pass: string)`: Autentica al usuario
- `logout()`: Limpia la sesión
- `getToken()`: Obtiene el token actual
- `isLoggedIn()`: Verifica si hay una sesión activa

### BookingService (`src/core/services/booking.service.ts`)

- `getBookings()`: Obtiene el listado de todos los bookings
- `filterBookings(bookings, bookingIdFilter, priceMinFilter, priceMaxFilter)`: Aplica los filtros

## 🛠️ Tecnologías Utilizadas

- **Angular**: v20.0.0 - Framework frontend
- **Ionic**: v8.0.0 - Framework móvil
- **TypeScript**: v5.9.0 - Lenguaje de programación
- **RxJS**: v7.8.0 - Programación reactiva
- **Angular Router**: Enrutamiento de la aplicación
- **HttpClientModule**: Llamadas HTTP

## 📝 Datos de Prueba

La aplicación incluye 5 bookings de prueba:

| BookingId | Cliente         | Precio   | Dirección            |
| --------- | --------------- | -------- | -------------------- |
| BK001     | Juan Pérez      | $35,000  | Calle Principal 123  |
| BK002     | María González  | $50,000  | Avenida Central 456  |
| BK003     | Carlos López    | $72,500  | Calle Secundaria 789 |
| BK004     | Ana Martínez    | $120,000 | Boulevard Mayor 321  |
| BK005     | Roberto Sánchez | $45,000  | Pasaje Pequeño 654   |

## 🔧 Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Compilar para producción
npm run build

# Ejecutar pruebas unitarias
npm test

# Verificar sintaxis/compilación sin compilar
npm run build -- --configuration=development

# Ejecutar en dispositivo iOS (requiere macOS)
ionic capacitor run ios

# Ejecutar en dispositivo Android
ionic capacitor run android
```

## 🐛 Solución de Problemas

### La aplicación no se abre

1. Verifica que `npm install` se completó correctamente
2. Limpia la caché: `rm -rf node_modules package-lock.json && npm install`
3. Verifica que el puerto 4200 no esté en uso

### El login no funciona

1. Verifica las credenciales: usuario `testapis@tuten.cl` y contraseña `1234`
2. Abre las DevTools (F12) → Network y verifica que el request a httpbin.org se ejecute
3. Limpia localStorage: `localStorage.clear()` en la consola

### Los filtros no funcionan

1. Verifica que `FormsModule` esté importado en `home.module.ts`
2. Verifica que `CommonModule` esté importado para las directivas `*ngIf` y `*ngFor`

### Los bookings no aparecen

1. Verifica que hayas iniciado sesión correctamente
2. Abre la consola (F12) y busca errores
3. Verifica que `BookingService` esté inyectado en `HomePage`

## 📞 Soporte

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.

---

**Última actualización:** 13 de Mayo 2026  
**Versión:** 1.0.0
