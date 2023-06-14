import { poll } from "../db.js";

import Sale from "../models/Sale.js";
import Registro from "../models/Registro.js";

export const getSales = async (req, res) => {
  try {
    const [rows] = await poll.query(
      "SELECT v.idventa, r.id_registro, v.fecha, r.rfc_empleado, o.operacion, t.total FROM ventas v, registros r, operaciones o, ticket t WHERE v.id_registro = r.id_registro AND r.id_operacion = o.id_operacion AND t.id_venta = v.idventa"
    );

    return rows.length <= 0
      ? res.json({ status: "not found", message: "no hay ventas registradas" })
      : res.json(rows);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const getSale = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await poll.query(
      "SELECT v.idventa, r.id_registro, v.fecha, r.rfc_empleado, o.operacion, t.total FROM ventas v, registros r, operaciones o, ticket t WHERE v.id_registro = r.id_registro AND r.id_operacion = o.id_operacion AND t.id_venta = v.idventa AND v.idventa = ?",
      [id]
    );

    const [productos] = await poll.query(
      "Select p.id_producto, p.nombre, p.costo, list.cantidad from ventas v, listaproductosventa list, productos p WHERE v.idventa = list.id_venta AND list.id_producto = p.id_producto AND v.idventa = ?",
      [id]
    );

    const sale = new Sale(rows[0]);
    sale.productos = productos;

    return rows.length <= 0
      ? res
          .status(404)
          .json({ status: "not found", message: "no se encontro la venta" })
      : res.json(sale);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const addSale = async (req, res) => {
  const { rfc_usuario, id_operacion, fecha, productos, total } = req.body;

  try {
    const nuevoRegistro = new Registro({ rfc_usuario, id_operacion });

    const [reg] = await poll.query(
      "INSERT INTO registros (rfc_empleado, id_operacion) VALUES(?, ?)",
      [nuevoRegistro.rfc_usuario, nuevoRegistro.id_operacion]
    );

    if (reg.insertId === 0)
      return res
        .status(500)
        .json({ status: "error", message: "No se pudo crear el registro" });

    const id_registro = reg.insertId;

    const newVenta = new Sale({ fecha, id_registro });

    const [result] = await poll.query(
      "INSERT INTO ventas (fecha, id_registro) VALUES(?,?)",
      [newVenta.fecha, newVenta.id_registro]
    );

    if (result.insertId === 0)
      return res
        .status(500)
        .json({ status: "error", message: "No se pudo crear la venta" });
    const id_venta = result.insertId;

    productos.forEach(async (producto) => {
      const [insert] = await poll.query(
        "INSERT INTO listaproductosventa (id_venta, id_producto, cantidad) VALUES (?,?,?)",
        [id_venta, producto.id, producto.cantidad]
      );
    });

    const [resultT] = await poll.query(
      "INSERT INTO ticket (id_venta, total) VALUES (?,?)",
      [id_venta, total]
    );

    if (resultT.insertId === 0)
      return res.status(500).json({
        status: "error",
        message: "No se pudo generar el ticket de la venta",
      });

    return res.json({
      status: "created",
      message:
        "La venta se registro con exito, con el id -> " +
        id_venta +
        " y el registro -> " +
        id_registro +
        " y el ticket -> " +
        resultT.insertId,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const updateSale = async (req, res) => {
  const { id } = req.params;
  const { id_registro, rfc_usuario, fecha, total, productos } = req.body;
  const messages = [];
  try {
    const [reg] = await poll.query(
      "UPDATE registros SET rfc_empleado = IFNULL(?, rfc_empleado) WHERE id_registro = ?",
      [rfc_usuario, id_registro]
    );

    if (reg.affectedRows === 0)
      res
        .status(500)
        .json({ status: "error", message: "no se reconocio el RFC" });

    const [result] = await poll.query(
      "UPDATE ventas SET fecha = IFNULL(?, fecha) WHERE idventa = ?",
      [fecha, id]
    );

    if (result.affectedRows === 0)
      messages.push({
        status: "error",
        message: "no se pudo actualizar la fecha",
      });

    productos.forEach(async (producto) => {
      const [resultP] = await poll.query(
        "UPDATE listaproductosventa SET cantidad = IFNULL(?, cantidad) WHERE id_venta = ? AND id_producto = ?",
        [producto.cantidad, id, producto.id]
      );

      if (resultP.affectedRows === 0)
        await poll.query(
          "INSERT INTO listaproductosventa (id_venta, id_producto, cantidad) VALUES (?,?,?)",
          [id, producto.id, producto.cantidad]
        );
    });

    const [resultT] = await poll.query(
      "UPDATE ticket SET total = IFNULL(?, total) WHERE id_venta = ?",
      [total, id]
    );
    if (resultT.affectedRows === 0)
      messages.push({
        status: "error",
        message: "no se pudo actualizar el ticket",
      });

    res.json({
      status: "updated",
      message: [
        ...messages,
        { status: "updated", message: "actualizado correctamente" },
      ],
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const deleteSale = async (req, res) => {
  const { id, id_registro } = req.body;
  const messages = [];
  try {
    const [result] = await poll.query(
      "DELETE FROM listaproductosventa WHERE id_venta = ?",
      [id]
    );
    if (result.affectedRows === 0)
      messages.push({
        status: "not found",
        message: "No hay productos asosciados a la venta",
      });
    const [resultV] = await poll.query("DELETE FROM ventas WHERE idventa = ?", [
      id,
    ]);
    if (resultV.affectedRows === 0)
      messages.push({ status: "not found", message: "No Existe la venta" });
    const [resultR] = await poll.query(
      "DELETE FROM registros WHERE id_registro = ?",
      [id_registro]
    );
    if (resultR.affectedRows === 0)
      messages.push({
        status: "not found",
        message: "No Existe el nuemero de registro",
      });

    return res.json({
      status: "deleted",
      message:
        messages.length >= 1 ? messages : "Venta eliminada correctamente",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
