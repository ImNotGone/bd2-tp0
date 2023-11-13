# API
## Build
```sh
npm install
```

## Run
```sh
node index.js
```

## Config
A file named `config.json` must be on this directory and contain the following fields, filled acording to your configuration
```json 
{
  "postgres": {
    "user": "user",
    "host": "host",
    "database": "database",
    "password": "password",
    "port": 5432
  },
  "mongo": {
    "uri": "mongodb://localhost:27017",
    "database": "tp0"
  },
  "persistence": "mongo"
}
```

With this file you can configure potgres, mongo and which persistence layer to be used by the api.
The layers currently supported are `mongo` and `postgres`.

## Endpoints

### HOME
#### `GET` : `/`

### Clients
#### `POST` : `/clients`
To create a client, the following fields must be complete
```json
{
    "nro_cliente": 101,
    "nombre": "example-name",
    "apellido" : "example-lastname",
    "direccion" : "example-address",
    "activo" : 20
}
```
#### `PUT` : `/clients/:id`
To update a client, the following fields must be complete
```json
{
    "nro_cliente": 101,
    "nombre": "updated-name",
    "apellido" : "updated-lastname",
    "direccion" : "updated-address",
    "activo" : 21
}
```
#### `DELETE` : `/clients/:id`

### Products
#### `POST` : `/products`
To create a product, the following information must be complete
```json
{
    "codigo_producto": 101,
    "marca": "example-brand",
    "nombre" : "example-name",
    "descripcion" : "example-description",
    "precio": 69.0,
    "stock" : 20
}
```
#### `PUT` : `/products/:id`
To update a product, the following information must be complete
```json
{
    "codigo_producto": 101,
    "marca": "updated-brand",
    "nombre" : "updated-name",
    "descripcion" : "updated-description",
    "precio": 70.0,
    "stock" : 21
}
```
