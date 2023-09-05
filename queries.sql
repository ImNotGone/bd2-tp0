-- 1
-- Obtener el telefono y el numero de cliente del cliente con nombre "Wanda" y apellido "Baker".
SELECT nro_telefono, t.nro_cliente
FROM e01_cliente JOIN e01_telefono t on e01_cliente.nro_cliente = t.nro_cliente
WHERE nombre = 'Wanda' AND apellido = 'Baker';

-- 2
-- Seleccionar todos los clientes que tengan registrada al menos una factura.
SELECT *
FROM e01_cliente
WHERE nro_cliente IN (
    SELECT nro_cliente
    FROM e01_factura
);

-- 3
-- Seleccionar todos los clientes que *no* tengan registrada una factura.
SELECT *
FROM e01_cliente
WHERE nro_cliente NOT IN (
    SELECT nro_cliente
    FROM e01_factura
);

-- 4
-- Seleccionar los productos que han sido facturados al menos 1 vez.
SELECT *
FROM e01_producto
WHERE codigo_producto IN (
    SELECT codigo_producto
    FROM e01_detalle_factura
);

-- 5
-- Seleccionar los datos de los clientes junto con sus telefonos.
SELECT *
FROM e01_cliente JOIN e01_telefono t on e01_cliente.nro_cliente = t.nro_cliente;

-- 6
-- Devolver todos los clientes, con la cantidad de facturas que han realizado.
SELECT c.*, COUNT(f.nro_factura) AS cantidad_facturas
FROM e01_cliente c JOIN e01_factura f on c.nro_cliente = f.nro_cliente
GROUP BY c.nro_cliente;

-- 7
-- Listar las facturas que hayan sido compradas por el cliente de nombre "Pandora" y apellido "Tate".
SELECT *
FROM e01_factura
WHERE nro_cliente = (
    SELECT nro_cliente
    FROM e01_cliente
    WHERE nombre = 'Pandora' AND apellido = 'Tate'
);

-- 8
-- Listar todas las facturas que contengan productos de la marca "In Faucibus Inc."
SELECT *
FROM e01_factura
WHERE nro_factura IN (
    SELECT nro_factura
    FROM e01_detalle_factura
    WHERE codigo_producto IN (
        SELECT codigo_producto
        FROM e01_producto
        WHERE marca = 'In Faucibus Inc.'
    )
);

-- 9
-- Mostrar cada telefono junto con los datos del cliente.
SELECT *
FROM e01_telefono JOIN e01_cliente c on e01_telefono.nro_cliente = c.nro_cliente;

-- 10
-- Mostrar nombre y apellido de cada cliente junto con lo que gasto en total (con IVA incluido).
SELECT c.nombre, c.apellido, SUM(f.total_con_iva) as total
FROM e01_cliente c JOIN e01_factura f on c.nro_cliente = f.nro_cliente
GROUP BY c.nro_cliente;
