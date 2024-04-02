# Usa la imagen base
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala las dependencias de la aplicación
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que tu aplicación se ejecuta (de acuerdo a lo configurado en .env)
EXPOSE 3000

# Copia el archivo .env al contenedor desde la ubicación especificada
COPY config/.env ./


# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
