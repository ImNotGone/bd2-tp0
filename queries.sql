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