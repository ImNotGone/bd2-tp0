-- 1
-- Se debe realizar una vista que devuelva las facturas ordenadas por fecha.
CREATE VIEW facturas_ordenadas AS
SELECT * FROM e01_factura ORDER BY fecha;
