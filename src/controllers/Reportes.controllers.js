import Sale from "../models/Sale.js";

import { poll } from "../db.js";

export const getReportes = async (req, res) => {
  try {
    const [rows] = await poll.query(
      "SELECT r.id_registro, r.rfc_empleado, o.id_operacion, o.operacion FROM registros r, operaciones o WHERE r.id_operacion = o.id_operacion"
    );

    return rows.length <= 0
      ? res.json({ status: "not found", message: "no hay ventas registradas" })
      : res.json(rows);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const getReporte = async (req, res) => {
  const { id, operacion } = req.params;
  console.log(id, parseInt(operacion));
  let reporte = {};

  try {
    if (operacion == 1) {
      console.log("operacion compra");
      const [rows] = await poll.query(
        "SELECT r.id_registro, r.rfc_empleado, r.id_operacion, o.operacion, oc.id_orden_compra, oc.id_proveedor, oc.total, p.nombre, p.telefono, p.correo FROM registros r, operaciones o, ordencompra oc, proveedor p WHERE r.id_operacion = o.id_operacion AND r.id_registro = oc.id_registro AND oc.id_proveedor = p.id_proveedor AND r.id_registro = ?",
        [id]
      );

      reporte = rows[0];

      const [productos] = await poll.query(
        "SELECT p.id_producto, p.nombre, list.cantidad_producto FROM productos p, listaproductoscompras list, registros r, ordencompra oc WHERE r.id_registro = oc.id_registro AND oc.id_orden_compra = list.id_orden_compra AND r.id_registro = ? AND list.id_producto = p.id_producto",
        [id]
      );

      const [insumos] = await poll.query(
        "SELECT i.id_insumo, i.nombre, list.cantidad_insumo FROM insumos i, listaproductoscompras list, registros r, ordencompra oc WHERE r.id_registro = oc.id_registro AND oc.id_orden_compra = list.id_orden_compra AND r.id_registro = ? AND list.id_insumo = i.id_insumo",
        [id]
      );

      reporte.productos = productos;
      reporte.insumos = insumos;

    } else if (operacion == 2) {
      console.log("operacion venta");

      const [rows] = await poll.query(
        "SELECT r.id_registro, r.rfc_empleado, o.id_operacion, o.operacion, v.idventa, v.fecha, t.total FROM ventas v, registros r, operaciones o, ticket t WHERE v.id_registro = r.id_registro AND r.id_operacion = o.id_operacion AND t.id_venta = v.idventa AND r.id_registro = ?",
        [id]
      );

      reporte = rows[0];

      const [productos] = await poll.query(
        "SELECT p.id_producto, p.nombre, p.precio_venta, list.cantidad FROM ventas v, listaproductosventa list, productos p, registros r WHERE r.id_registro = v.id_registro AND v.idventa = list.id_venta AND list.id_producto = p.id_producto AND r.id_registro = ?",
        [id]
      );

       reporte.productos = productos;
    }
    return reporte === {}
      ? res.json({
          status: "not found",
          message: "no se encontro el registro",
        })
      : res.json(reporte);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
