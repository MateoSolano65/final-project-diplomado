# 🧸 API de Blog de Juguetes

Una API REST completa para gestionar una plataforma de blog de juguetes, desarrollada con Node.js, Express y MongoDB.

## 📋 Índice

- [🧸 API de Blog de Juguetes](#-api-de-blog-de-juguetes)
  - [📋 Índice](#-índice)
  - [📝 Descripción](#-descripción)
  - [✨ Características principales](#-características-principales)
  - [🛠️ Tecnologías utilizadas](#️-tecnologías-utilizadas)
  - [📋 Requisitos previos](#-requisitos-previos)
  - [🚀 Instalación y configuración](#-instalación-y-configuración)
    - [Instalación](#instalación)
    - [Configuración del archivo .env](#configuración-del-archivo-env)
  - [▶️ Ejecución](#️-ejecución)
    - [Modo desarrollo (con recarga automática)](#modo-desarrollo-con-recarga-automática)
    - [Modo producción](#modo-producción)
  - [📁 Estructura del proyecto](#-estructura-del-proyecto)
  - [🔌 API Endpoints](#-api-endpoints)
    - [Autenticación](#autenticación)
    - [Usuarios](#usuarios)
    - [Juguetes](#juguetes)
    - [Gestión de imágenes](#gestión-de-imágenes)
    - [Comentarios](#comentarios)
  - [📊 Modelos de datos](#-modelos-de-datos)
    - [Usuario](#usuario)
    - [Juguete](#juguete)
    - [Comentario](#comentario)
  - [🔐 Autenticación y autorización](#-autenticación-y-autorización)
    - [Tipos de acceso](#tipos-de-acceso)
    - [Header de autorización](#header-de-autorización)
  - [🖼️ Gestión de imágenes](#️-gestión-de-imágenes)
    - [Acceso a imágenes](#acceso-a-imágenes)
    - [Formato de carga](#formato-de-carga)
  - [👑 Usuario administrador](#-usuario-administrador)
  - [⚠️ Manejo de errores](#️-manejo-de-errores)
  - [🤝 Contribución](#-contribución)
  - [📄 Licencia](#-licencia)

## 📝 Descripción

Esta API proporciona toda la infraestructura backend necesaria para gestionar un blog de juguetes completo, permitiendo:

- Gestión de usuarios con roles diferenciados
- Publicación y administración de artículos sobre juguetes
- Sistema de comentarios
- Carga y gestión de imágenes
- Autenticación segura mediante JWT

## ✨ Características principales

- **Arquitectura REST** - Diseño claro y modular siguiendo mejores prácticas
- **Autenticación JWT** - Sistema seguro de autenticación y autorización
- **Gestión de imágenes** - Carga, actualización y eliminación de imágenes
- **Sistema de comentarios** - Usuarios pueden comentar en los juguetes
- **Roles de usuario** - Separación entre administradores y usuarios normales
- **Validaciones robustas** - Todas las entradas son validadas antes de ser procesadas

## 🛠️ Tecnologías utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL con Mongoose como ODM
- **JWT** - Autenticación basada en tokens
- **Bcrypt** - Encriptación segura de contraseñas
- **Express Validator** - Validación de datos de entrada
- **Multer** - Gestión de carga de archivos
- **Dotenv** - Gestión de variables de entorno

## 📋 Requisitos previos

- Node.js (versión 16 o superior)
- MongoDB (instalado localmente o cuenta en MongoDB Atlas)
- npm o yarn

## 🚀 Instalación y configuración

### Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/blog-juguetes-api.git
cd blog-juguetes-api
```

2. Instala las dependencias:

```bash
npm install
```

### Configuración del archivo .env

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
# Servidor
PORT=3000
API_VERSION=v1.0
NODE_ENV=development

# Base de datos
MONGODB_URI=mongodb://localhost:27017/toy-blog
# O, si usas MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/toy-blog

# JWT
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRATION=1d

# Admin por defecto (se crea al iniciar la aplicación)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=contraseña_segura
ADMIN_NAME=Administrador

# Carpeta para imágenes
UPLOAD_DIR=uploads
```

## ▶️ Ejecución

### Modo desarrollo (con recarga automática)

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

## 📁 Estructura del proyecto

```
backend/
│
├── app.js                    # Punto de entrada de la aplicación
├── package.json              # Dependencias y scripts
│
├── src/
│   ├── config/               # Configuración
│   │   ├── db.config.js      # Conexión a MongoDB
│   │   └── envs.config.js    # Variables de entorno
│   │
│   ├── constants/            # Constantes y enumeraciones
│   │   ├── roles.constants.js
│   │   └── toy.constants.js
│   │
│   ├── controllers/          # Controladores HTTP
│   │   ├── auth.controller.js
│   │   ├── toys.controller.js
│   │   └── users.controller.js
│   │
│   ├── helpers/              # Funciones auxiliares
│   │
│   ├── middlewares/          # Middlewares de Express
│   │   ├── auth.middleware.js
│   │   └── uploads.toys.middleware.js
│   │
│   ├── models/               # Esquemas y modelos de Mongoose
│   │   ├── toy-comment.model.js
│   │   ├── toys.model.js
│   │   └── users.model.js
│   │
│   ├── routes/               # Definición de rutas API
│   │   ├── auth.routes.js
│   │   ├── toys.routes.js
│   │   └── users.routes.js
│   │
│   ├── services/             # Lógica de negocio
│   │   ├── auth.service.js
│   │   ├── jwt.service.js
│   │   └── toys.service.js
│   │
│   └── validators/           # Validación de datos
│       ├── auth.validator.js
│       └── toys.validator.js
│
└── uploads/                  # Carpeta de imágenes cargadas
    └── toys/                 # Imágenes de juguetes
```

## 🔌 API Endpoints

La API utiliza el prefijo `/api/v1.0` para todas las rutas.

### Autenticación

| Método | Endpoint         | Descripción         | Acceso  | Ejemplo de cuerpo                                                                  |
| ------ | ---------------- | ------------------- | ------- | ---------------------------------------------------------------------------------- |
| `POST` | `/auth/register` | Registro de usuario | Público | `{"name": "Usuario", "email": "usuario@ejemplo.com", "password": "contraseña123"}` |
| `POST` | `/auth/login`    | Inicio de sesión    | Público | `{"email": "usuario@ejemplo.com", "password": "contraseña123"}`                    |

Ejemplo de respuesta login exitoso:

```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Usuario",
      "email": "usuario@ejemplo.com",
      "role": "user"
    }
  }
}
```

### Usuarios

| Método   | Endpoint     | Descripción                | Acceso |
| -------- | ------------ | -------------------------- | ------ |
| `GET`    | `/users`     | Obtener todos los usuarios | Admin  |
| `GET`    | `/users/:id` | Obtener un usuario por ID  | Admin  |
| `POST`   | `/users`     | Crear un nuevo usuario     | Admin  |
| `PUT`    | `/users/:id` | Actualizar un usuario      | Admin  |
| `DELETE` | `/users/:id` | Eliminar un usuario        | Admin  |

### Juguetes

| Método   | Endpoint    | Descripción                | Acceso  | Ejemplo de cuerpo/parámetros                                                                                                     |
| -------- | ----------- | -------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/toys`     | Obtener todos los juguetes | Público | Parámetros de consulta opcionales: `?category=educativo&limit=10&page=1`                                                         |
| `GET`    | `/toys/:id` | Obtener un juguete por ID  | Público | -                                                                                                                                |
| `POST`   | `/toys`     | Crear un nuevo juguete     | Admin   | `{"title": "Osito de peluche", "description": "Un suave osito...", "category": "peluches", "tags": ["oso", "peluche", "suave"]}` |
| `PUT`    | `/toys/:id` | Actualizar un juguete      | Admin   | `{"title": "Osito de peluche grande", "description": "..."}`                                                                     |
| `DELETE` | `/toys/:id` | Eliminar un juguete        | Admin   | -                                                                                                                                |

### Gestión de imágenes

| Método   | Endpoint                    | Descripción                  | Acceso | Tipo de contenido     |
| -------- | --------------------------- | ---------------------------- | ------ | --------------------- |
| `PUT`    | `/toys/:id/cover`           | Establecer imagen de portada | Admin  | `multipart/form-data` |
| `POST`   | `/toys/:id/images`          | Añadir imágenes al juguete   | Admin  | `multipart/form-data` |
| `PUT`    | `/toys/:id/images/:imageId` | Actualizar una imagen        | Admin  | `multipart/form-data` |
| `DELETE` | `/toys/:id/image/:imageId`  | Eliminar una imagen          | Admin  | -                     |

### Comentarios

| Método   | Endpoint                           | Descripción                       | Acceso           | Ejemplo de cuerpo                                    |
| -------- | ---------------------------------- | --------------------------------- | ---------------- | ---------------------------------------------------- |
| `GET`    | `/toys/:toyId/comments`            | Obtener comentarios de un juguete | Público          | -                                                    |
| `POST`   | `/toys/:toyId/comments`            | Añadir comentario                 | Usuario          | `{"content": "¡Me encanta este juguete!"}`           |
| `PUT`    | `/toys/:toyId/comments/:commentId` | Actualizar comentario             | Usuario (propio) | `{"content": "¡Realmente me encanta este juguete!"}` |
| `DELETE` | `/toys/:toyId/comments/:commentId` | Eliminar comentario               | Usuario (propio) | -                                                    |

## 📊 Modelos de datos

### Usuario

```json
{
  "_id": "ObjectId", // ID único generado por MongoDB
  "name": "String", // Nombre completo
  "email": "String", // Email único
  "password": "String (hashed)", // Contraseña encriptada (nunca devuelta al cliente)
  "role": "String (user/admin)", // Rol de usuario
  "createdAt": "Date", // Fecha de creación
  "updatedAt": "Date" // Fecha de última actualización
}
```

### Juguete

```json
{
  "_id": "ObjectId", // ID único generado por MongoDB
  "title": "String", // Título del juguete
  "category": "String", // Categoría (peluches, educativos, electrónicos, etc.)
  "description": "String", // Descripción detallada
  "cover": "String", // URL de la imagen de portada
  "images": [
    // Galería de imágenes
    {
      "_id": "ObjectId", // ID único para cada imagen
      "url": "String" // Ruta relativa a la imagen
    }
  ],
  "tags": ["String"], // Etiquetas para búsqueda y clasificación
  "createdBy": "ObjectId (User)", // Referencia al usuario que lo creó
  "createdAt": "Date", // Fecha de creación
  "updatedAt": "Date" // Fecha de última actualización
}
```

### Comentario

```json
{
  "_id": "ObjectId", // ID único generado por MongoDB
  "content": "String", // Contenido del comentario
  "toy": "ObjectId (Toy)", // Referencia al juguete comentado
  "user": "ObjectId (User)", // Referencia al usuario que comentó
  "createdAt": "Date", // Fecha de creación
  "updatedAt": "Date" // Fecha de última actualización
}
```

## 🔐 Autenticación y autorización

### Tipos de acceso

- **Público**: No requiere autenticación
- **Usuario**: Requiere estar logueado con cualquier rol
- **Admin**: Requiere estar logueado con rol de administrador

### Header de autorización

Para acceder a los endpoints protegidos, incluye el token JWT en el header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

El token se obtiene al iniciar sesión y tiene una caducidad configurable en el archivo `.env`.

## 🖼️ Gestión de imágenes

### Acceso a imágenes

Las imágenes cargadas se sirven desde una ruta pública. Puedes acceder a ellas mediante:

```
http://localhost:<PORT>/images/toys/<filename>
```

Donde:

- `<PORT>` es el puerto configurado en el archivo `.env`
- `<filename>` es el nombre del archivo tal como aparece en el campo `url` o `cover` en el modelo de juguete

### Formato de carga

Para subir imágenes, usa el formato `multipart/form-data`:

- Para portada (cover): campo `cover` con un único archivo
- Para galería (images): campo `images` puede contener múltiples archivos

## 👑 Usuario administrador

Al iniciar la aplicación por primera vez, se crea automáticamente un usuario administrador usando los datos definidos en el archivo `.env`:

```
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=contraseña_segura
ADMIN_NAME=Administrador
```

Usa estas credenciales para obtener acceso administrativo completo a la API.

## ⚠️ Manejo de errores

La API devuelve errores con el siguiente formato:

```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": [
    {
      "field": "campo_con_error",
      "message": "Descripción detallada del error"
    }
  ],
  "statusCode": 400
}
```

Los códigos de estado HTTP más comunes:

- `400` - Bad Request (error en datos enviados)
- `401` - Unauthorized (no autenticado)
- `403` - Forbidden (sin permisos)
- `404` - Not Found (recurso no encontrado)
- `500` - Internal Server Error (error del servidor)

## 🤝 Contribución

1. Haz fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/increible-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añade increíble funcionalidad'`)
4. Haz push a la rama (`git push origin feature/increible-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia especificada en el archivo LICENSE.
