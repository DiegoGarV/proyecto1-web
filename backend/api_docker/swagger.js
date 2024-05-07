import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

// Metadata info about API
const options = {
  definition: {
    openapi: '3.0.0',
    info: {title: 'Stardew Blogs API', version: '1.0.0'}
  },
  apis: ['index.js']
}

// Doc with JSON format
const swaggerSpec = swaggerJSDoc(options)

// Setup server
export const swaggerDocs = (app, json) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('/api-docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  console.log(`Version 1 Docs are available at http://127.0.0.1::${json}/api-docs`)
}