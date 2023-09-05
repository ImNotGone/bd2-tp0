const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Home
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// 1
// Dar de alta a nuevos clientes, baja y modificacion de los ya existentes
app.post('/clients/:id', db.createClient)
app.put('/clients/:id', db.updateClient)
app.delete('/clients/:id', db.deleteClient)

// 2
// Dar de alta nuevos productos y modificacion de los ya existentes.
// Tenga en cuenta que el precio de un producto es sin IVA.
app.post('/products/:id', db.createProduct)
app.put('/products/:id', db.updateProduct)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
