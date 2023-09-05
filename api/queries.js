const { Pool } = require('pg');
const fs = require('fs');

// Read the database configuration from db-config.json
const dbConfig = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));

// Create a PostgreSQL connection pool using the imported credentials
const pool = new Pool(dbConfig);

const createClient = (request, response) => {
    const { nro_cliente, nombre, apellido, direccion, activo } = request.body

    pool.query('INSERT INTO e01_cliente (nro_cliente, nombre, apellido, direccion, activo) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nro_cliente, nombre, apellido, direccion, activo], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Client added with ID: ${results.insertId}`)
    })
}

module.exports = {
    createClient,
}