# 🧸 Blog de Juguetes - Proyecto Completo

Una aplicación web full-stack para publicar, explorar y comentar sobre juguetes, desarrollada con Angular en el frontend y Node.js/Express/MongoDB en el backend.

## 📋 Índice

- [🧸 Blog de Juguetes - Proyecto Completo](#-blog-de-juguetes---proyecto-completo)
  - [📋 Índice](#-índice)
  - [📝 Descripción del proyecto](#-descripción-del-proyecto)
  - [✨ Características clave](#-características-clave)
  - [🛠️ Tecnologías utilizadas](#️-tecnologías-utilizadas)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [📋 Requisitos de sistema](#-requisitos-de-sistema)
  - [🚀 Instalación y configuración](#-instalación-y-configuración)
    - [1. Clonar el repositorio](#1-clonar-el-repositorio)
    - [2. Configurar el Backend](#2-configurar-el-backend)
    - [3. Configurar el Frontend](#3-configurar-el-frontend)
  - [▶️ Ejecución del proyecto](#️-ejecución-del-proyecto)
    - [Iniciar el Backend](#iniciar-el-backend)
    - [Iniciar el Frontend](#iniciar-el-frontend)
  - [📁 Estructura del proyecto](#-estructura-del-proyecto)
  - [🌟 Características detalladas](#-características-detalladas)
    - [Para usuarios](#para-usuarios)
    - [Para administradores](#para-administradores)
  - [📚 Documentación específica](#-documentación-específica)
  - [❓ Preguntas frecuentes](#-preguntas-frecuentes)
    - [¿Cómo cambio el puerto del servidor backend?](#cómo-cambio-el-puerto-del-servidor-backend)
    - [¿Cómo creo una cuenta de administrador?](#cómo-creo-una-cuenta-de-administrador)
    - [¿Puedo utilizar otra base de datos?](#puedo-utilizar-otra-base-de-datos)
    - [¿Cómo personalizo el tema visual?](#cómo-personalizo-el-tema-visual)
  - [🤝 Contribución](#-contribución)
  - [📄 Licencia](#-licencia)

## 📝 Descripción del proyecto

El Blog de Juguetes es una aplicación web completa que ofrece una plataforma donde los usuarios pueden explorar una colección de juguetes, leer detalles y opiniones, y compartir sus pensamientos a través de comentarios. Los administradores pueden gestionar el catálogo completo, añadiendo nuevos juguetes con imágenes y descripciones detalladas.

## ✨ Características clave

- **Arquitectura moderna** - Aplicación full-stack con frontend Angular y backend Node.js/Express
- **Interfaz atractiva** - Diseño responsive con Angular Material
- **Catálogo de juguetes** - Sistema completo para visualizar y gestionar juguetes
- **Autenticación y roles** - Sistema seguro con roles de usuario y administrador
- **Sistema de comentarios** - Permite a usuarios autenticados comentar en los juguetes
- **Gestión de imágenes** - Carga y visualización de múltiples imágenes por juguete
- **API RESTful** - Backend con endpoints bien organizados para todas las operaciones
- **Base de datos NoSQL** - Almacenamiento flexible con MongoDB
- **Seguridad robusta** - Protección de rutas, validación de datos, y manejo de tokens JWT

## 🛠️ Tecnologías utilizadas

### Frontend

- Angular (v19.2)
- TypeScript
- Angular Material
- RxJS
- HTML5 & SCSS

### Backend

- Node.js
- Express.js
- MongoDB con Mongoose
- JSON Web Tokens (JWT)
- Multer (manejo de archivos)
- bcrypt (encriptación)

## 📋 Requisitos de sistema

- **Node.js** - Versión 16 o superior
- **MongoDB** - Instalado localmente o una cuenta en MongoDB Atlas
- **Angular CLI** - Para desarrollo frontend (`npm install -g @angular/cli`)
- **Espacio en disco** - Mínimo 500MB para instalación y desarrollo
- **Navegador moderno** - Chrome, Firefox, Edge o Safari en sus versiones recientes

## 🚀 Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/blog-juguetes.git
cd blog-juguetes
```

### 2. Configurar el Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env

# Editar el archivo .env con tus configuraciones
# - Configurar la conexión a MongoDB
# - Definir clave secreta para JWT
# - Configurar credenciales de admin por defecto
```

### 3. Configurar el Frontend

```bash
# Navegar al directorio frontend
cd ../frontend

# Instalar dependencias
npm install

# Crear archivo de entorno
cp src/environments/environment.dev.ts src/environments/environment.ts

# Ajustar la URL de la API en environment.ts si es necesario
```

## ▶️ Ejecución del proyecto

Para ejecutar el proyecto completo, necesitas iniciar tanto el backend como el frontend.

### Iniciar el Backend

```bash
# Desde el directorio backend
npm run dev  # Para entorno de desarrollo con recarga automática
# o
npm start    # Para entorno de producción
```

El servidor backend estará disponible en `http://localhost:3000` por defecto.

### Iniciar el Frontend

```bash
# Desde el directorio frontend
ng serve
```

La aplicación frontend estará disponible en `http://localhost:4200`.

## 📁 Estructura del proyecto

```
blog-juguetes/
├── README.md                 # Documentación principal
│
├── backend/                  # Servidor API REST
│   ├── app.js               # Punto de entrada
│   ├── package.json         # Dependencias y scripts
│   ├── README.md            # Documentación específica del backend
│   ├── src/                 # Código fuente
│   │   ├── config/          # Configuración
│   │   ├── constants/       # Constantes y enumeraciones
│   │   ├── controllers/     # Controladores HTTP
│   │   ├── helpers/         # Funciones auxiliares
│   │   ├── middlewares/     # Middlewares de Express
│   │   ├── models/          # Modelos de Mongoose
│   │   ├── routes/          # Definición de rutas
│   │   ├── services/        # Lógica de negocio
│   │   └── validators/      # Validadores de datos
│   │
│   └── uploads/             # Carpeta para imágenes subidas
│       └── toys/            # Imágenes de juguetes
│
└── frontend/                # Aplicación Angular
    ├── angular.json         # Configuración de Angular
    ├── package.json         # Dependencias y scripts
    ├── README.md            # Documentación específica del frontend
    └── src/                 # Código fuente
        ├── app/             # Componentes, servicios, etc.
        ├── assets/          # Recursos estáticos
        └── environments/    # Configuración por entorno
```

## 🌟 Características detalladas

### Para usuarios

- **Exploración de juguetes** - Navega por el catálogo completo de juguetes
- **Búsqueda y filtrado** - Encuentra juguetes específicos fácilmente
- **Visualización de detalles** - Información completa con galería de imágenes
- **Comentarios** - Lee y escribe opiniones sobre los juguetes
- **Cuenta de usuario** - Registro e inicio de sesión seguros

### Para administradores

- **Gestión completa** - CRUD completo para juguetes
- **Subida de imágenes** - Añade múltiples imágenes a cada juguete
- **Moderación de comentarios** - Capacidad para eliminar comentarios inapropiados
- **Panel de administración** - Vista dedicada para gestionar el contenido

## 📚 Documentación específica

Para información más detallada sobre cada parte del proyecto:

- [📘 Documentación del Frontend](./frontend/README.md)
- [📗 Documentación del Backend](./backend/README.md)

## ❓ Preguntas frecuentes

### ¿Cómo cambio el puerto del servidor backend?

Modifica la variable `PORT` en el archivo `.env` del backend.

### ¿Cómo creo una cuenta de administrador?

La primera vez que se inicia el servidor, se crea automáticamente un usuario administrador utilizando las credenciales definidas en el archivo `.env` del backend.

### ¿Puedo utilizar otra base de datos?

El proyecto está configurado para MongoDB, pero puedes adaptar los modelos y servicios para otras bases de datos modificando la capa de acceso a datos en el backend.

### ¿Cómo personalizo el tema visual?

Puedes modificar los estilos globales en `frontend/src/global.scss` o cambiar el tema de Angular Material en `angular.json`.

## 🤝 Contribución

Si deseas contribuir a este proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commits de tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

Por favor, asegúrate de que tu código sigue las convenciones del proyecto y todas las pruebas pasan antes de enviar un PR.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia especificada en el archivo LICENSE.
