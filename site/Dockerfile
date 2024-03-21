# Etapa de construcción
FROM node:alpine as build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y el archivo package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todos los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Construir la aplicación React
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos compilados del frontend al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar la configuración específica del entorno (config.prod.js) al directorio de Nginx
COPY config/config.prod.js /usr/share/nginx/html/config.js

# Exponer el puerto 80 (el puerto predeterminado de Nginx)
EXPOSE 80

# Comando para iniciar el servidor Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
