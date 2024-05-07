import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {getAllBlogs, createBlog, deleteBlog, getBlogById, editBlog, getUserById, getAllUsers, createUser} from './db.js'
import { swaggerDocs as V1SwaggerDocs } from './swagger.js'

const app = express()
const port = 3410

app.use(bodyParser.json())

// Implementa cors
console.log('enable Cors')
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
  V1SwaggerDocs(app, port)
})

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Obtener todos los blogs
 *     description: Devuelve una lista de todos los blogs.
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve la lista de blogs.
 *       500:
 *         description: Error interno del servidor.
 */
app.get('/blogs', async (req, res) => {
  const blogs = await getAllBlogs()
  res.status(blogs.status).json(blogs)
})

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Devuelve una lista de todos los usuarios.
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve la lista de usuarios.
 *       500:
 *         description: Error interno del servidor.
 */
app.get('/users', async (req, res) => {
  const users = await getAllUsers()
  res.status(users.status).json(users)
})

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Crear un nuevo blog
 *     description: Endpoint para crear un nuevo blog.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               item_image:
 *                 type: string
 *               image_description:
 *                 type: string
 *               user_id:
 *                 type: int
 *     responses:
 *       201:
 *         description: El blog fue creado exitosamente.
 *       400:
 *         description: El formato en el cuerpo de la solicitud es incorrecto.
 */
app.post('/blogs', async (req, res) => {
  const [title, content, item_image, image_description, user_id] = [req.body.title, req.body.content, req.body.item_image, req.body.image_description, req.body.user_id]
  const blogs = await createBlog(title, content, item_image, image_description, user_id)
  res.status(blogs.status).json(blogs)
})

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Endpoint para crear un nuevo usuario.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       201:
 *         description: El usuario fue creado exitosamente.
 *       400:
 *         description: El formato en el cuerpo de la solicitud es incorrecto.
 */
app.post('/users', async (req, res) => {
  const [nombre, contrasena] = [req.body.nombre, req.body.contrasena]
  const user = await createUser(nombre, contrasena)
  res.status(user.status).json(user)
})

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Eliminar un blog por ID
 *     description: Elimina un blog específico según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del blog a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Operación exitosa. El blog ha sido eliminado.
 *       404:
 *         description: Blog no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
app.delete('/blogs/:id', async (req,res) =>{
  const id = req.params.id
  console.log(id)
  const result = await deleteBlog(id)
  if (result.status === 404) {
    res.status(404).json({ error: 'Blog not found' })
  } else {
    res.status(result.status).json({status: result.status})
  }
})

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Obtener un blog por ID
 *     description: Devuelve un blog específico según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del blog a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve el blog solicitado.
 *       404:
 *         description: Blog no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
app.get('/blogs/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  const blog = await getBlogById(id)
  res.status(blog.status).json(blog)
})

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Devuelve un usuario específico según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del blog a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve el usuario solicitado.
 *       404:
 *         description: usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
app.get('/users/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  const usuario = await getUserById(id)
  res.status(usuario.status).json(usuario)
})

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Actualizar un blog por ID
 *     description: Actualiza un blog específico según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del blog a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               item_image:
 *                  type: string
 *               image_description:
 *                 type: string  
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve el blog actualizado.
 *       404:
 *         description: Blog no encontrado.
 *       400:
 *         description: El formato en el cuerpo de la solicitud es incorrecto.
 */
app.put('/blogs/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  const [title, content, item_image, image_description] = [req.body.title, req.body.content, req.body.item_image, req.body.image_description]
  const blog = await editBlog(id, title, content, item_image, image_description)
  res.status(blog.status).json(blog)
})

/**
 * @swagger
 * /blogs:
 *   all:
 *     summary: Endpoint no implementado
 *     description: Devuelve una respuesta indicando que el endpoint no está implementado.
 *     responses:
 *       501:
 *         description: El servidor no implementa la funcionalidad solicitada.
 */
app.all(['/blogs', '/blogs/:id'], (req, res) => {
  res.status(501).json({ status: '501', error: 'Not Implemented' })
})