const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

const db = require('./queries')

// 1
// Dar de alta a nuevos clientes, baja y modificacion de los ya existentes
app.put('/clients', db.createClient)
app.post('/clients/:id', db.updateClient)
app.delete('/clients/:id', db.deleteClient)

// 2
// Dar de alta nuevos productos y modificacion de los ya existentes.
// Tenga en cuenta que el precio de un producto es sin IVA.
api.put('/products', db.createProduct)
api.post('/products/:id', db.updateProduct)
