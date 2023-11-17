const pgp = require('pg-promise')();
const { MongoClient } = require('mongodb');
const fs = require("fs");

// Connection settings
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

// MongoDB connection settings
const mongoUrl = config["mongo"]["uri"];
const dbName = config["mongo"]["database"];

// Connect to PostgreSQL
const pgdb = pgp(config["postgres"])

// Connect to MongoDB and create the target collection
// Based on the data in the PostgreSQL table
async function migrateDataToMongoDB(collectionName, tableName, mapFunction) {
  const mongoClient = new MongoClient(mongoUrl, { useUnifiedTopology: true });

  try {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);

    // Query PostgreSQL and insert into MongoDB
    const pgData = await pgdb.any(`SELECT * FROM ${tableName}`);
    const mongoData = pgData.map(mapFunction);

    const insertResult = await collection.insertMany(mongoData);
    console.log(`${insertResult.insertedCount} records inserted into MongoDB collection '${collectionName}'`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    await mongoClient.close();
  }
};

const mapClient = (row) => ({
  nro_cliente: row.nro_cliente,
  nombre: row.nombre,
  apellido: row.apellido,
  direccion: row.direccion,
  activo: row.activo,
});

const mapDetalleFactura = (row) => ({
    nro_factura: row.nro_factura,
    codigo_producto: row.codigo_producto,
    nro_item: row.nro_item,
    cantidad: row.cantidad
});

const mapFactura = (row) => ({
    nro_factura: row.nro_factura,
    fecha: row.fecha,
    total_sin_iva: row.total_sin_iva,
    iva: row.iva,
    total_con_iva: row.total_con_iva,
    nro_cliente: row.nro_cliente
});

const mapProducto = (row) => ({
    codigo_producto: row.codigo_producto,
    marca: row.marca,
    nombre: row.nombre,
    descripcion: row.descripcion,
    precio: row.precio,
    stock: row.stock
});

const mapTelefono = (row) => ({
    codigo_area: row.codigo_area,
    nro_telefono: row.nro_telefono,
    tipo: row.tipo,
    nro_cliente: row.nro_cliente
});

async function migrateData() {
  try {
    await migrateDataToMongoDB('clients', 'E01_CLIENTE', mapClient);
    await migrateDataToMongoDB('detalle_factura', 'E01_DETALLE_FACTURA', mapDetalleFactura);
    await migrateDataToMongoDB('factura', 'E01_FACTURA', mapFactura);
    await migrateDataToMongoDB('producto', 'E01_PRODUCTO', mapProducto);
    await migrateDataToMongoDB('telefono', 'E01_TELEFONO', mapTelefono);
  } catch (error) {
    console.error(`Error during migration: ${error.message}`);
  }
}

// Start the migration process
migrateData();
