## API
## Configuration
### API Config

### DB Config
A file named `credentials.json` must be on this directory and contain the following fields, filled acording to your configuration
```json 
{
  "user": "user",
  "host": "host",
  "database": "database",
  "password": "password",
  "port": 5432
}
```

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

#### `DELETE` : `/clients/:id`

### Products
#### `POST` : `/products`

#### `DELETE` : `/products/:id`