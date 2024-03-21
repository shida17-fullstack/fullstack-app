# Acerca de - Backend de la Aplicación Full Stack
Este proyecto representa el backend de la aplicación full stack, diseñado para funcionar en conjunto con el frontend React desplegado en Google Cloud Platform. A continuación se detalla la configuración del backend y cómo se integra con el frontend.

## Configuración del Backend (Node.js)
El backend de la aplicación está diseñado para recibir solicitudes del frontend en el puerto 3000. Asegúrate de que el backend esté en funcionamiento en este puerto antes de ejecutar el frontend. Puedes configurar el puerto del backend modificando el archivo .env en la raíz del proyecto. Utiliza el archivo .env.example como plantilla para establecer las variables de entorno necesarias, incluyendo la configuración del puerto del backend.

De esta manera, tanto el frontend como el backend pueden ser configurados adecuadamente para que se comuniquen entre sí correctamente. El archivo .env.example proporciona una referencia para establecer las configuraciones necesarias en el archivo .env específico de cada entorno.

## Despliegue en Google Cloud Platform
Para desplegar esta aplicación en Google Cloud Platform, sigue las instrucciones proporcionadas en el README ubicado en la carpeta raíz del proyecto. Este README contiene información detallada sobre cómo configurar y desplegar tanto el frontend como el backend en GCP utilizando Jenkins, Google Cloud Build, Cloud Storage, Secret Manager y Kubernetes.

Para más detalles sobre el proceso de despliegue en GCP, consulta el README en la carpeta raíz del proyecto.

## Estructura del Proyecto

```markdown

fullstack-app/
|__ api/
|   |__ config/
|   |   |__ .env
|   |   |__ .env.example
|   |   |__ passport.js
|   |
|   |__ controllers/
|   |   |__ index.js
|   |   |__ users.js
|   |
|   |__ coverage/
|   |
|   |__ data/
|   |   |__ users/
|   |
|   |__ models/
|   |   |__ index.js
|   |   |__ users.js
|   |
|   |__ node_modules/
|   |
|   |__ routes/
|   |   |__ catchAllRoute.js
|   |   |__ protectedRoutes.js
|   |   |__ publicRoutes.js
|   |
|   |__ tests/
|   |   |__ login.test.js
|   |   |__ register.test.js
|   |
|   |__ utils/
|   |   |__ generateUniqueId.js
|   |   |__ index.js
|   |
|   |__ app.js
|   |__ deployment-backend.yaml
|   |__ Dockerfile
|   |__ package-lock.json
|   |__ package.json
|   └── README.md
|   |__ server.js

```
### Explicación de la Estructura

- **api/**: Directorio principal del backend de la aplicación.
  - **config/**: Contiene archivos de configuración para el backend.
    - `.env`: Archivo de variables de entorno para configuración específica.
    - `.env.example`: Archivo de ejemplo para variables de entorno.
    - `passport.js`: Archivo de configuración para Passport.js utilizado en la autenticación.
  - **controllers/**: Directorio que contiene controladores para manejar las diferentes rutas y operaciones del backend.
    - `index.js`: Archivo de punto de entrada que exporta todos los controladores.
    - `users.js`: Controlador para manejar las operaciones relacionadas con los usuarios.
  - **coverage/**: Directorio que contiene los reportes de cobertura generados por pruebas unitarias.
  - **data/**: Directorio que contiene archivos de datos.
    - `users/`: Directorio que contiene información relacionada con registro de usuarios.
  - **models/**: Directorio que contiene los modelos de datos de la aplicación.
    - `index.js`: Archivo de punto de entrada que exporta todos los modelos.
    - `users.js`: Modelo específico para los usuarios.
  - **node_modules/**: Directorio que almacena todas las dependencias de Node.js necesarias para el proyecto.
  - **routes/**: Directorio que contiene los archivos de definición de rutas para el servidor.
    - `catchAllRoute.js`: Archivo que define la ruta para manejar todas las demás solicitudes.
    - `protectedRoutes.js`: Archivo que define las rutas protegidas que requieren autenticación.
    - `publicRoutes.js`: Archivo que define las rutas públicas que no requieren autenticación.
  - **tests/**: Directorio que contiene los archivos de pruebas unitarias para el backend.
    - `login.test.js`: Pruebas relacionadas con la autenticación de usuarios.
    - `register.test.js`: Pruebas relacionadas con el registro de nuevos usuarios.
  - **utils/**: Directorio que contiene archivos de utilidades o funciones de ayuda.
    - `generateUniqueId.js`: Función para generar identificadores únicos.
    - `index.js`: Archivo de punto de entrada que exporta todas las utilidades.
  - `app.js`: Archivo principal de la aplicación Node.js donde se configuran las rutas y middlewares.
  - `deployment-backend.yaml`: Archivo de configuración para el despliegue del backend en Kubernetes GCP.
  - `Dockerfile`: Archivo con las instrucciones para construir una imagen de Docker para el backend GCP.
  - `package-lock.json`: Archivo generado por npm que almacena información sobre las dependencias.
  - `package.json`: Archivo de configuración de npm que especifica las dependencias y scripts del proyecto.
  - `README.md`: Archivo de documentación del backend que contiene información sobre configuración, instalación, ejecución y más detalles sobre el proyecto.
  - `server.js`: Archivo principal del servidor que inicia la aplicación backend.


## Instalación
Clona este repositorio en tu máquina local.
Navega a la carpeta del backend (fullstack-app/api).
Ejecuta npm install para instalar las dependencias.

## Configuración
Copia el archivo de ejemplo .env.example y renómbralo a .env.
Completa las variables de entorno en el archivo .env según sea necesario.

## Ejecución en Desarrollo
Para ejecutar el backend en entorno de desarrollo, puedes utilizar el siguiente comando:

```bash 

npm run start:local

```

Esto iniciará el servidor en el puerto 3000, conectándose al frontend React que se espera que esté en ejecución en localhost:3002.

## Scripts Disponibles
npm test: Ejecuta las pruebas unitarias.
npm run test:coverage: Ejecuta las pruebas unitarias con información de cobertura.
npm run test:watch: Ejecuta las pruebas unitarias en modo observador.
