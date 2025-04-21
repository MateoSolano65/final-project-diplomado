# Blog de Juguetes API

API backend para un blog de juguetes, desarrollada con Node.js, Express y MongoDB.

## Descripción

Este proyecto proporciona una API RESTful para gestionar un blog de juguetes, incluyendo funcionalidades para manejo de usuarios, productos, y más.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB (con Mongoose)
- bcrypt (para encriptación de contraseñas)
- express-validator
- dotenv (para gestión de variables de entorno)
- multer (para manejo de archivos)

## Requisitos previos

- Node.js (versión 16 o superior)
- MongoDB instalado localmente o una cuenta en MongoDB Atlas
- npm o yarn

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
```

2. Instala las dependencias:

```bash
npm install
```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias. Puedes usar el archivo `.env.example` como referencia:

  ```bash
  cp .env.example .env
  ```


## Ejecución

### Modo desarrollo

Para ejecutar la aplicación en modo desarrollo con recarga automática:

```bash
npm run dev
```

### Modo producción

Para ejecutar la aplicación en modo producción:

```bash
npm start
```

## Estructura del proyecto

```
app.js                    # Punto de entrada de la aplicación
package.json
src/
  ├── config/             # Configuración (bases de datos, etc.)
  ├── constants/          # Constantes y enumeraciones
  ├── controllers/        # Controladores para manejar las solicitudes HTTP
  ├── helpers/            # Funciones de ayuda
  ├── middlewares/        # Middlewares de Express
  ├── models/             # Modelos de Mongoose
  ├── routes/             # Definición de rutas de la API
  ├── services/           # Lógica de negocio
  └── validators/         # Validadores para las solicitudes
uploads/
  └── toys/               # Carpeta donde se almacenan las imágenes de juguetes
```

## API Endpoints

La API utiliza la base `/api/v1.0` para todas las rutas.

### Rutas:

## Autenticación y autorización:

- `POST /auth/register` - Registrar un nuevo usuario
- `POST /auth/login` - Iniciar sesión

### Usuarios:

- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener un usuario específico
- `POST /users` - Crear un nuevo usuario
- `PUT /users/:id` - Actualizar un usuario
- `DELETE /users/:id` - Eliminar un usuario

### Juguetes:

- `GET /toys` - Obtener todos los juguetes
- `GET /toys/:id` - Obtener un juguete específico
- `POST /toys` - Crear un nuevo juguete
- `PUT /toys/:id` - Actualizar un juguete
- `DELETE /toys/:id` - Eliminar un juguete

### Gestión de imágenes de juguetes:

- `PUT /toys/:id/cover` - Añadir una imagen de portada a un juguete
- `POST /toys/:id/images` - Subir imágenes para un juguete
- `PUT /toys/:id/images/:imageId` - Actualizar una imagen de un juguete
- `DELETE /toys/:id/images/:imageId` - Eliminar una imagen de un juguete

### Comentarios a los juguetes:

- `POST /toys/:id/comments` - Crear un nuevo comentario para un juguete
- `PUT /toys/:id/comments/:commentId` - Actualizar un comentario de un juguete
- `DELETE /toys/:id/comments/:commentId` - Eliminar un comentario de un juguete

## Seguridad y autorización

### Endpoints protegidos

Algunos endpoints requieren autenticación y/o permisos de administrador para ser accedidos. A continuación, se detalla el nivel de acceso necesario:

#### Requieren autenticación (cualquier usuario autenticado):
- **Comentarios a los juguetes:**
  - `POST /toys/:id/comments` - Crear un nuevo comentario para un juguete.
  - `PUT /toys/:id/comments/:commentId` - Actualizar un comentario de un juguete.
  - `DELETE /toys/:id/comments/:commentId` - Eliminar un comentario de un juguete.

#### Requieren permisos de administrador:
- **Gestión de usuarios:**
  - `GET /users` - Obtener todos los usuarios.
  - `GET /users/:id` - Obtener un usuario específico.
  - `POST /users` - Crear un nuevo usuario.
  - `PUT /users/:id` - Actualizar un usuario.
  - `DELETE /users/:id` - Eliminar un usuario.

- **Gestión de juguetes:**
  - `POST /toys` - Crear un nuevo juguete.
  - `PUT /toys/:id` - Actualizar un juguete.
  - `DELETE /toys/:id` - Eliminar un juguete.

### Uso del header `Authorization`

Para acceder a los endpoints protegidos, es necesario incluir un header `Authorization` con un token JWT válido. El formato del header es el siguiente:

```http
Authorization: Bearer <token>
```

Donde `<token>` es el token JWT generado al iniciar sesión. Este token debe ser enviado en cada solicitud a los endpoints protegidos.

Si el token es inválido, ha expirado o no se incluye, el servidor responderá con un error de autorización.

## Modelo de datos

### Usuario

```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "password": "String (hashed)",  // NO se devuelve la contraseña en las respuestas al cliente
  "role": "String (user/admin)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Juguete

```json
{
  "_id": "ObjectId",
  "title": "String",
  "category": "String",
  "description": "String",
  "cover": "String",
  "images": [
    {
      "_id": "ObjectId",
      "url": "String",
    }
  ],
  "tags": ["String"],
  "createdBy": "ObjectId (User)",
  "lastLogin": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Comentario

```json
{
  "_id": "ObjectId",
  "content": "String",
  "toy": "ObjectId (Toy)",
  "user": "ObjectId (User)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Acceso a las imágenes

Las imágenes subidas se pueden acceder directamente a través de la URL:

- `http://localhost:<PORT>/images/:url` donde <PORT> es el puerto configurado en el archivo `.env`. y `url` es el valor de la propiedad `url` de cada imagen.


## Usuario administrador
Para interactuar como un administrador debes ingresar con las credenciales especificadas en el archivo `.env`.

## Contribución

1. Haz fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia que se especifica en el archivo LICENSE.