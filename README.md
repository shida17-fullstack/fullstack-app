## Acerca de: Pipeline de Integración Continua y Despliegue Continuo (CI/CD) en Google Cloud Platform

Este repositorio contiene los archivos necesarios para configurar un pipeline de CI/CD utilizando Google Cloud Platform (GCP), Cloud Build, Secret Manager, Storage y Kubernetes. A continuación, se explica cada archivo y su función en el proceso de automatización.

### Archivos de Configuración

#### Kubernetes
- **deployment-backend.yaml:** Este archivo describe el despliegue del backend en Kubernetes. Define un Deployment con tres réplicas del contenedor backend, especificando la imagen Docker a utilizar (`gcr.io/jenkinsgpc/my-backend:v1`) y el puerto en el que el contenedor expone su servicio (puerto 3000). También incluye un Service para exponer el backend externamente a través de un balanceador de carga.
- **deployment-frontend.yaml:** Similar al archivo anterior, este describe el despliegue del frontend en Kubernetes. Define un Deployment con tres réplicas del contenedor frontend, especificando la imagen Docker a utilizar (`gcr.io/jenkinsgpc/my-frontend:v1`) y el puerto en el que el contenedor expone su servicio (puerto 80).

#### Docker
- **Dockerfile (Backend):** Este archivo describe la configuración para construir la imagen Docker del backend. Utiliza la imagen base de Node.js 14, instala las dependencias de la aplicación, copia los archivos de la aplicación y expone el puerto 3000. Finalmente, especifica el comando para ejecutar la aplicación.
- **Dockerfile (Frontend):** Similar al archivo anterior, este describe la configuración para construir la imagen Docker del frontend. Utiliza la imagen base de Nginx Alpine, copia los archivos compilados del frontend, copia la configuración específica del entorno y expone el puerto 80.

#### Cloud Build
- **cloudbuild.yaml:** Este archivo describe los pasos necesarios para realizar la construcción y el almacenamiento de las imágenes Docker en Google Cloud Storage. Primero, construye la imagen Docker del backend y luego la del frontend. Especifica las imágenes a almacenar y la ubicación del bucket de Cloud Storage.

#### Jenkinsfile
- **Jenkinsfile:** Este archivo contiene la definición del pipeline de Jenkins. Tiene varias etapas, incluyendo la construcción de las imágenes Docker del backend y frontend, la ejecución de pruebas unitarias y el despliegue en Kubernetes.

### Archivos de Configuración Adicionales

#### Env File (.env)
El archivo `.env` (backend) contiene las variables de entorno necesarias para la configuración del backend. A continuación se muestra un ejemplo de cómo configurar las variables relevantes para Cloud Storage y Secret Manager de GCP:

```plaintext
# Cambiar a true si utiliza clave Secret Manager de GCP 
USE_SECRET_MANAGER=false

# Cambiar a false si utiliza almacenamiento en la nube Storage GCP 
USE_LOCAL_STORAGE=true

GCP_TOKEN_SECRET=nombre_variable_secret_manager_gcp

```
#### Configuración del Archivo `config.prod.js`

Una vez que hayas desplegado tu backend en Google Cloud Platform y tengas la URL correspondiente, necesitarás actualizar el archivo `config.prod.js` en tu aplicación frontend para reflejar esta configuración.

Este archivo se encuentra en la ruta `site/src/config/config.prod.js` y contiene la configuración para la URL del servicio de backend.

##### Pasos para Configurar `config.prod.js`:

1. **Obtener la URL del Servicio Backend Desplegado en GCP:**
   Después de que tu backend haya sido desplegado correctamente en Google Cloud Platform, recibirás la URL correspondiente.

2. **Actualizar el Archivo `config.prod.js`:**
   Abre el archivo `config.prod.js` y actualiza la variable `api` con la URL de tu backend en GCP.

   Ejemplo:

   ```javascript
   
   const config = {};

   config.domains = {};
   config.domains.api = "https://tu-api-en-gcp"; // Reemplaza con la URL de tu backend en GCP

   export default config;

  ```

3. **Guardar y Subir los Cambios:**
   Guarda los cambios realizados en el archivo config.prod.js y súbelo a tu repositorio en GitHub para reflejar las actualizaciones en tu aplicación frontend.
   Con estos pasos, tu aplicación frontend estará configurada correctamente para comunicarse con el servicio de backend desplegado en Google Cloud Platform.


### Instrucciones de Uso

1. **Configuración de GCP:** Asegúrate de tener una cuenta en Google Cloud Platform y haber configurado adecuadamente tus credenciales y permisos.
2. **Configuración de Secret Manager:** Define los secretos necesarios para tu aplicación, como claves de API o tokens de acceso, en Secret Manager de GCP.
3. **Configuración de Cloud Build:** Habilita Cloud Build en tu proyecto de GCP y asegúrate de tener permisos para ejecutar construcciones.
4. **Configuración de Storage:** Crea un bucket en Cloud Storage para almacenar las imágenes Docker generadas durante el proceso de construcción.
5. **Configuración de Kubernetes:** Configura tu clúster de Kubernetes en GCP y asegúrate de tener acceso para aplicar los despliegues.
6. **Configuración de Jenkins:** Configura un pipeline en Jenkins y referencia el Jenkinsfile proporcionado en este repositorio.
7. **Ejecución del Pipeline:** Al realizar cambios en tu repositorio, Jenkins automáticamente iniciará el pipeline, construyendo las imágenes Docker, ejecutando pruebas y desplegando la aplicación en Kubernetes.

Con estas instrucciones, podrás configurar un pipeline de CI/CD efectivo utilizando las herramientas proporcionadas por Google Cloud Platform.
