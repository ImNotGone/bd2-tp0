# Migration PostgreSQL to MongoDB
## Build
```sh
npm install
```

## Run
```sh
node import.js
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
}
```

This file will be used to connect to both databases and start the migration.