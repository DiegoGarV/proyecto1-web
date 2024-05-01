# Obtiene la última imagen de mysql
FROM mysql:latest

# Establece las variables de ambiente para el mysql
ENV MYSQL_DATABASE=blog_db
ENV MYSQL_ROOT_PASSWORD=root_password

# Crea un usuario para la base de datos 
ENV MYSQL_USER=blog_user
ENV MYSQL_PASSWORD=blog_password

# Copia el esquema .sql en la imagen
COPY schema.sql ./docker-entrypoint-initdb.d/