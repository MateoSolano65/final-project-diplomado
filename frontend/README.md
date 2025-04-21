# Blog de Juguetes - Frontend

Este proyecto está desarrollado con Angular (versión 19.2) y proporciona la interfaz de usuario para la aplicación Blog de Juguetes.

## Características

- Visualización de juguetes con imágenes y descripción
- Panel de administración para usuarios con rol admin
- Sistema de autenticación
- Comentarios en juguetes
- Interfaz de usuario moderna con Angular Material

## Requisitos previos

- Node.js (versión 16 o superior)
- npm (normalmente viene con Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## Instalación

1. Clona el repositorio completo o solo esta carpeta

```bash
git clone <url-del-repositorio>
cd final-project-diplomado/frontend
```

2. Instala las dependencias

```bash
npm install
```

3. Configuración de entornos

El proyecto incluye plantillas de archivos de entorno en la carpeta `src/environments/`. **Es necesario crear el archivo de entorno principal** basado en la plantilla proporcionada:

```bash
# Copia la plantilla de entorno de desarrollo
cp src/environments/environment.dev.ts src/environments/environment.ts
```

También puedes modificar estos archivos según tus necesidades específicas, como cambiar la URL de la API o el nombre del almacenamiento local.

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

El servidor estará disponible en `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos de origen.

## Conexión con el Backend

El frontend está configurado para comunicarse con el backend en `http://localhost:3000`. Asegúrate de que el servidor backend esté en funcionamiento antes de utilizar funcionalidades que requieran autenticación o datos del servidor.

Puedes encontrar la configuración de la URL del backend en:
```
src/environments/environment.ts
```

## Construcción

Para construir el proyecto para producción:

```bash
ng build
```

Los archivos de la build se almacenarán en el directorio `dist/`. Usa la bandera `--configuration=production` para una compilación de producción.

## Estructura del proyecto

- `src/app/components`: Componentes reutilizables (header, footer, etc.)
- `src/app/pages`: Páginas principales (home, login, admin-dashboard)
- `src/app/services`: Servicios para comunicación con la API REST
- `src/app/guards`: Guards para proteger rutas autenticadas
- `src/app/interceptors`: Interceptores HTTP para manejar tokens de autenticación
- `src/app/shared`: Módulos compartidos (Material UI)
- `src/environments`: Configuración de entornos (dev, prod)

## Tests

Para ejecutar los tests unitarios:

```bash
ng test
```
