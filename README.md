<h1 align="center"> Proyecto 1 - Web </h1>

## Índice

* [Requisitos](#requisitos)

* [Iniciar la API](#iniciar-la-api)

* [Iniciar el frontend](#iniciar-el-frontend)
  
* [URL del proyecto](#url-del-proyecto)

* [Privilegios de administrador](#privilegios-de-administrador)

* [Usuario no administrador](#usuario-no-administrador)

## Requisitos
<p>Es necesario descargar node.js y npm para que el proyecto funcione. Node.js se puede instalar desde aquí https://nodejs.org/ y luego para que funcione hay que ir a la carpeta del proyecto "proyecto1-web" y por último colocar el comando npm install para instalar todas las dependencias.</p>

## Iniciar la API

<p>Para iniciar la api hay que dirigirse a la carpeta del backend.</p>
<p>./proyecto1-web/backend</p>
<p>Luego hay que escribir el comando que levanta el docker compose.</p>
<p>  - En windows</p>
<p>    docker compose up</p>
<p>  - En ubuntu</p>
<p>    sudo docker compose up</p>

## Iniciar el frontend

<p>Para iniciar el frontend hay que dirigirse a la carpeta "proyecto 1" .</p>
<p>"./proyecto1-web/proyecto 1"</p>
<p>Luego hay que escribir el comando que levanta el docker container del front.</p>
<p>  - En windows</p>
<p>    docker build -t stardew_blog_gg:latest .</p>
<p>    docker run --name stardew-blog-front -d -p 3777:5173 stardew_blog_gg</p>
<p>  - En ubuntu</p>
<p>    sudo docker build -t stardew_blog_gg:latest .</p>
<p>    sudo docker run --name stardew-blog-front -d -p 3777:5173 stardew_blog_gg</p>

## URL del proyecto

<p>El blog puede verse en este link:</p>
<p>http://uwu-guate.site:3777</p>

## Privilegios de administrador

<p>El administrador puede borrar y editar todos los posts en el blog, independientemente si fueron hechos por él o no.</p>
<p>Usuario:</p>
<p>DiegoFBI</p>
<p>Contraseñá:</p>
<p>12345</p>

## Usuario no administrador

<p>Si por alguna razón no se puede crear un usuario en el apartado de registar usar este.</p>
<p>Usuario:</p>
<p>MrMelard</p>
<p>Contraseñá:</p>
<p>bigpops</p>
