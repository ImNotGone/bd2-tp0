-- 1
-- Se debe realizar una vista que devuelva las facturas ordenadas por fecha.
CREATE VIEW facturas_ordenadas AS
SELECT *
FROM e01_factura
ORDER BY fecha;

-- 2
-- Se necesita una vista que devuelva todos los productos que aun no han sido facturados.
CREATE VIEW productos_no_facturados AS
SELECT *
FROM e01_producto
WHERE codigo_producto NOT IN (
    SELECT codigo_producto
    FROM e01_detalle_factura
);
