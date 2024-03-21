# Acerca de - Frontend de la Aplicación Full Stack
Este proyecto representa el frontend de una aplicación full stack que será desplegada en Google Cloud Platform. Está construido utilizando React y contiene una variedad de archivos y carpetas organizados para facilitar el desarrollo y el mantenimiento del código.

## Configuración del Frontend (React)
El frontend de la aplicación se comunica con el backend a través de una solicitud HTTP. Por defecto, el backend está configurado para escuchar en el puerto 3000. Antes de ejecutar el frontend, asegúrate de que el backend esté en funcionamiento en este puerto. Puedes configurar el puerto del backend según tus necesidades modificando el archivo .env en la raíz del proyecto. Utiliza el archivo .env.example como guía para establecer las variables de entorno necesarias, incluyendo la configuración del puerto del backend.

Para detalles específicos sobre la configuración del backend y cómo ajustarla según tus necesidades, consulta el README correspondiente en la carpeta del backend.

## Despliegue en Google Cloud Platform
Para desplegar esta aplicación en Google Cloud Platform, sigue las instrucciones proporcionadas en el README ubicado en la carpeta raíz del proyecto. Este README contiene información detallada sobre cómo configurar y desplegar tanto el frontend como el backend en GCP utilizando Jenkins, Google Cloud Build, Cloud Storage, Secret Manager y Kubernetes.

Para más detalles sobre el proceso de despliegue en GCP, consulta el README en la carpeta raíz del proyecto.

## Estructura de Carpetas

```markdown

fullstack-app/
└── site/
    ├── src/
    │   ├── config/
    │   │   ├── config.js
    │   │   ├── config.local.js
    │   │   └── config.prod.js
    │   ├── fragments/
    │   │   └── Loading/
    │   │       ├── index.js
    │   │       ├── Loading.js
    │   │       └── Loading.module.css
    │   ├── pages/
    │   │   ├── Auth/
    │   │   │   ├── Auth.js
    │   │   │   └── Auth.module.css
    │   │   ├── Dashboard/
    │   │   │   ├── Dashboard.js
    │   │   │   └── Dashboard.module.css
    │   │   └── Home/
    │   │       ├── Home.js
    │   │       └── Home.module.css
    │   └── utils/
    │       ├── api.js
    │       ├── helpers.js
    │       └── index.js
    ├── App.js
    ├── App.module.css
    ├── index.css
    ├── index.js
    ├── deployment-frontend.yaml
    ├── Dockerfile
    ├── package-lock.json
    ├── package.json
    └── README.md    

```

### Explicación de la Estructura

- **src/**: Directorio que contiene el código fuente del frontend.
  - **config/**: Contiene archivos de configuración para diferentes entornos.
    - `config.js`: Archivo de configuración principal.
    - `config.local.js`: Configuración para entorno local.
    - `config.prod.js`: Configuración para entorno de producción.
  - **fragments/**: Fragmentos reutilizables de componentes.
    - **Loading/**: Componente de carga.
      - `index.js`
      - `Loading.js`
      - `Loading.module.css`
  - **pages/**: Páginas principales de la aplicación.
    - **Auth/**: Página de autenticación.
      - `Auth.js`
      - `Auth.module.css`
    - **Dashboard/**: Página del panel de control.
      - `Dashboard.js`
      - `Dashboard.module.css`
    - **Home/**: Página de inicio.
      - `Home.js`
      - `Home.module.css`
  - **utils/**: Utilidades y funciones de ayuda.
    - `api.js`: Funciones para realizar solicitudes a la API.
    - `helpers.js`: Funciones de ayuda adicionales.
    - `index.js`: Archivo de exportación de utilidades.

- **Deployment Files**: Archivos necesarios para el despliegue de la aplicación.
  - `deployment-frontend.yaml`: Archivo de despliegue para Kubernetes GCP.
  - `Dockerfile`: Archivo de Docker para construir la imagen del frontend GCP.

- **Archivos de Configuración**: Archivos necesarios para la configuración del proyecto.
  - `package.json`: Archivo de configuración de npm.
  - `package-lock.json`: Archivo de bloqueo de dependencias.
 

- **Archivos Principales**:
  - `App.js`: Archivo principal de la aplicación React.
  - `App.module.css`: Estilos para el componente principal de la aplicación.
  - `index.js`: Archivo de inicio de la aplicación.
  - `index.css`: Estilos globales de la aplicación.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

```bash 

npm start

```

Ejecuta la aplicación en modo de desarrollo.<br />
Abre [http://localhost:3002](http://localhost:3002) para verla en el navegador.

```bash 

npm test

```

Lanza el corredor de pruebas en modo interactivo.<br />
(Actualmente no hay pruebas disponibles para el frontend. Sin embargo, si deseas crear pruebas para el frontend en el futuro, puedes ejecutar el comando npm test en el directorio correspondiente). 
Consulta la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para obtener más información.


```bash 

npm run build

```

Compila la aplicación para producción en la carpeta `build`.<br />
Optimiza automáticamente React para obtener el mejor rendimiento.
Tu aplicación está lista para ser desplegada.
Consulta la sección sobre [despliegue](https://facebook.github.io/create-react-app/docs/deployment) para obtener más información.

## Más Información
Puedes aprender más en la [documentación de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).
Para aprender React, consulta la [documentación de React](https://reactjs.org/).