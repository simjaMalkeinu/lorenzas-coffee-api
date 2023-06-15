import { poll } from "../db.js";

export const getOrdenes = async (req, res) => {
  try {
    const [result] = await poll.query(
      "SELECT oc.id_orden_compra, oc.estado, r.rfc_empleado, p.nombre, oc.total FROM ordencompra oc, proveedor p, registros r WHERE r.id_registro = oc.id_registro AND oc.id_proveedor = p.id_proveedor"
    );

    result.length <= 0
      ? res
          .status(404)
          .json({ status: "not found", message: "No hay ordenes registadas" })
      : res.json(result);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getOrden = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await poll.query(
      "SELECT oc.id_orden_compra, oc.estado, r.rfc_empleado, p.nombre, oc.total FROM ordencompra oc, proveedor p, registros r WHERE r.id_registro = oc.id_registro AND oc.id_proveedor = p.id_proveedor AND  oc.id_orden_compra = ?",
      [id]
    );

    const [productos] = await poll.query(
      "SELECT p.id_producto, p.nombre, list.cantidad_producto FROM productos p, listaproductoscompras list, ordencompra oc WHERE oc.id_orden_compra = list.id_orden_compra AND list.id_producto = p.id_producto AND oc.id_orden_compra = ?",
      [id]
    );

    const [insumos] = await poll.query(
      "SELECT i.id_insumo, i.nombre, list.cantidad_insumo FROM insumos i, listaproductoscompras list, ordencompra oc WHERE oc.id_orden_compra = list.id_orden_compra AND list.id_insumo = i.id_insumo  AND oc.id_orden_compra = ?",
      [id]
    );

    const orden = result[0]
    orden.productos = productos
    orden.insumos = insumos

    orden.length <= 0
      ? res
          .status(404)
          .json({ status: "not found", message: "No hay ordenes registadas" })
      : res.json(orden);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
