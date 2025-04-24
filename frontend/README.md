# 🧸 Blog de Juguetes - Frontend

Una interfaz de usuario moderna y atractiva para la plataforma de Blog de Juguetes, desarrollada con Angular y Material Design.

## 📋 Índice

- [🧸 Blog de Juguetes - Frontend](#-blog-de-juguetes---frontend)
  - [📋 Índice](#-índice)
  - [📝 Descripción](#-descripción)
  - [✨ Características principales](#-características-principales)
  - [🛠️ Tecnologías utilizadas](#️-tecnologías-utilizadas)
  - [📋 Requisitos previos](#-requisitos-previos)
  - [🚀 Instalación y configuración](#-instalación-y-configuración)
    - [Instalación](#instalación)
    - [Configuración de entornos](#configuración-de-entornos)
  - [▶️ Desarrollo](#️-desarrollo)
    - [Iniciar el servidor de desarrollo](#iniciar-el-servidor-de-desarrollo)
    - [Opciones adicionales](#opciones-adicionales)
  - [🏗️ Construcción para producción](#️-construcción-para-producción)
  - [📁 Estructura del proyecto](#-estructura-del-proyecto)
  - [🔌 Conexión con el Backend](#-conexión-con-el-backend)
  - [🎯 Funcionalidades detalladas](#-funcionalidades-detalladas)
    - [Página principal (Home)](#página-principal-home)
    - [Detalle de juguete](#detalle-de-juguete)
    - [Panel de administración](#panel-de-administración)
    - [Autenticación](#autenticación)
  - [🔐 Autenticación y roles](#-autenticación-y-roles)
    - [Roles de usuario](#roles-de-usuario)
    - [Protección de rutas](#protección-de-rutas)
    - [Interceptor de autenticación](#interceptor-de-autenticación)
  - [🧪 Tests](#-tests)
  - [📄 Licencia](#-licencia)

## 📝 Descripción

Este proyecto proporciona una interfaz de usuario completa y moderna para la aplicación Blog de Juguetes, permitiendo a los usuarios navegar por el catálogo de juguetes, leer y publicar comentarios, y a los administradores gestionar el contenido del blog.

## ✨ Características principales

- **Interfaz de usuario atractiva** - Diseño responsive con Angular Material
- **Catálogo de juguetes** - Visualización de juguetes con imágenes, descripciones y comentarios
- **Sistema de comentarios** - Permite a usuarios autenticados dejar comentarios en los juguetes
- **Panel de administración** - Gestión completa de juguetes para usuarios con rol de administrador
- **Autenticación JWT** - Registro e inicio de sesión seguros con almacenamiento de tokens
- **Visualización de imágenes** - Galería de imágenes con carrusel para cada juguete
- **Búsqueda y filtrado** - Búsqueda de juguetes por título, categoría o descripción
- **Navegación intuitiva** - Menús claros y rutas protegidas según el rol de usuario

## 🛠️ Tecnologías utilizadas

- **Angular** - Framework frontend (versión 19.2)
- **TypeScript** - Lenguaje de programación
- **Angular Material** - Biblioteca de componentes UI
- **RxJS** - Biblioteca para programación reactiva
- **Angular Router** - Enrutamiento y navegación
- **Angular Forms** - Formularios reactivos
- **HttpClient** - Comunicación con la API
- **Angular Material Icons** - Iconografía

## 📋 Requisitos previos

- Node.js (versión 16 o superior)
- npm (normalmente incluido con Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## 🚀 Instalación y configuración

### Instalación

1. Clona el repositorio o la carpeta frontend:

```bash
git clone <url-del-repositorio>
cd final-project-diplomado/frontend
```

2. Instala las dependencias:

```bash
npm install
```

### Configuración de entornos

El proyecto utiliza archivos de entorno para configurar diferentes aspectos según el entorno de despliegue:

1. Crea el archivo principal de entorno basado en la plantilla:

```bash
# Para entorno de desarrollo
cp src/environments/environment.dev.ts src/environments/environment.ts
```

2. Ajusta las configuraciones en el archivo según tus necesidades:

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api/v1.0", // URL de la API backend
  storageKeyToken: "toy-blog-token", // Clave para token en localStorage
  storageKeyUser: "toy-blog-user", // Clave para datos de usuario
};
```

## ▶️ Desarrollo

### Iniciar el servidor de desarrollo

```bash
ng serve
```

El servidor estará disponible en `http://localhost:4200`. La aplicación se recargará automáticamente cuando realices cambios en los archivos de código fuente.

### Opciones adicionales

```bash
# Servir en un puerto específico
ng serve --port 4201

# Servir con host abierto a la red local
ng serve --host 0.0.0.0

# Abrir automáticamente en el navegador
ng serve --open
```

## 🏗️ Construcción para producción

Para generar una versión optimizada para producción:

```bash
ng build --configuration=production
```

Los archivos compilados se almacenarán en el directorio `dist/frontend/`, listos para ser desplegados en cualquier servidor web estático.

## 📁 Estructura del proyecto

```
frontend/
│
├── src/
│   ├── app/
│   │   ├── components/              # Componentes reutilizables
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   ├── toy-details/
│   │   │   └── toy-form/
│   │   │
│   │   ├── pages/                   # Páginas principales
│   │   │   ├── admin-dashboard/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── services/                # Servicios para comunicación con API
│   │   │   ├── toy/
│   │   │   ├── user/
│   │   │   └── utils/
│   │   │
│   │   ├── guards/                  # Protección de rutas
│   │   │   ├── admin.guard.ts
│   │   │   └── auth.guard.ts
│   │   │
│   │   ├── interceptors/            # Interceptores HTTP
│   │   │   └── auth.interceptor.ts
│   │   │
│   │   ├── shared/                  # Módulos compartidos
│   │   │   └── material.module.ts
│   │   │
│   │   ├── app-routing.module.ts    # Configuración de rutas
│   │   ├── app.component.ts         # Componente raíz
│   │   ├── app.module.ts            # Módulo principal
│   │   └── types.ts                 # Interfaces y tipos
│   │
│   ├── assets/                      # Recursos estáticos
│   │   └── icon/
│   │
│   ├── environments/                # Configuración por entorno
│   │   ├── environment.dev.ts
│   │   └── environment.ts
│   │
│   ├── global.scss                  # Estilos globales
│   ├── index.html                   # HTML principal
│   └── main.ts                      # Punto de entrada
│
├── angular.json                     # Configuración de Angular CLI
├── package.json                     # Dependencias y scripts
├── tsconfig.json                    # Configuración de TypeScript
└── README.md                        # Documentación
```

## 🔌 Conexión con el Backend

El frontend se comunica con el backend a través de una API REST. La configuración de la URL base de la API se encuentra en `src/environments/environment.ts`:

```typescript
export const environment = {
  // ...
  apiUrl: "http://localhost:3000/api/v1.0",
  // ...
};
```

Asegúrate de que:

1. El servidor backend esté en ejecución en la URL configurada
2. CORS esté correctamente configurado en el backend para permitir peticiones desde el origen del frontend
3. La estructura de las respuestas del backend coincida con lo esperado por los servicios del frontend

## 🎯 Funcionalidades detalladas

### Página principal (Home)

- Visualización del catálogo de juguetes
- Búsqueda y filtrado por texto
- Tarjetas con información básica de cada juguete
- Vista previa de imágenes

### Detalle de juguete

- Información completa del juguete
- Carrusel de imágenes
- Sistema de comentarios
- Formulario para agregar comentarios (usuarios autenticados)
- Edición y eliminación de comentarios propios

### Panel de administración

- Vista de todos los juguetes en formato tabla
- Acciones para crear, editar y eliminar juguetes
- Formulario completo para la gestión de juguetes
- Carga de imágenes múltiples

### Autenticación

- Formulario de registro de usuario
- Formulario de inicio de sesión
- Manejo de tokens JWT
- Persistencia de sesión

## 🔐 Autenticación y roles

### Roles de usuario

- **Usuario regular**: Puede ver juguetes y dejar comentarios
- **Administrador**: Tiene acceso completo a todas las funcionalidades, incluyendo la gestión de juguetes

### Protección de rutas

Las rutas protegidas utilizan Guards de Angular:

- `AuthGuard`: Verifica si el usuario está autenticado
- `AdminGuard`: Verifica si el usuario tiene rol de administrador

### Interceptor de autenticación

El `AuthInterceptor` añade automáticamente el token JWT a todas las peticiones HTTP salientes hacia el backend, garantizando la autenticación continua.

## 🧪 Tests

Para ejecutar los tests unitarios:

```bash
ng test
```

Los tests utilizan Karma como ejecutor y Jasmine como framework de pruebas.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia especificada en el archivo LICENSE.
