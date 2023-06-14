import { poll } from "../db.js";

import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const [rows] = await poll.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await poll.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id]
    );

    if (rows.length <= 0)
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });

    const [insumos] = await poll.query(
      "SELECT i.id_insumo, i.nombre, i.caducidad, i.unidad, pi.cantidad FROM insumos i, productos p, producto_insumos pi WHERE p.id_producto = pi.id_producto AND i.id_insumo = pi.id_insumo AND p.id_producto = 2"
    );

    const producto = new Product(rows[0]);
    producto.insumos = insumos;

    res.json(producto);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const addProduct = async (req, res) => {
  const { insumos } = req.body;

  const producto = new Product(req.body);

  // console.log(producto);

  try {
    const [rows] = await poll.query(
      "INSERT INTO productos (nombre, costo, cantidad, caducidad, unidad, precio_venta, canmin) VALUES (?,?,?,?,?,?,?)",
      [
        producto.nombre,
        producto.costo,
        producto.cantidad,
        producto.caducidad,
        producto.unidad,
        producto.precio_venta,
        producto.canmin,
      ]
    );

    const id = rows.insertId;
    insumos.forEach(async (insumo) => {
      await poll.query(
        "INSERT INTO producto_insumos (id_producto, id_insumo, cantidad) VALUES (?,?,?)",
        [id, insumo.id, insumo.cantidad]
      );
    });

    return res.json({
      status: "created",
      message: "producto agregado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const delteProduct = async (req, res) => {
  const { id } = req.body;

  try {
    await poll.query("DELETE FROM producto_insumos WHERE id_producto = ?", [
      id,
    ]);

    const [rows] = await poll.query(
      "DELETE FROM productos WHERE id_producto = ?",
      [id]
    );

    return rows.affectedRows <= 0
      ? res.json({
          status: "incompleted",
          message: "No se encontro el producto",
        })
      : res.json({
          status: "deleted",
          message: "Producto eliminado exitosamente",
        });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updatedProduct = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    costo,
    cantidad,
    caducidad,
    unidad,
    precio_venta,
    insumos,
    canmin,
  } = req.body;
  try {
    const [result] = await poll.query(
      "UPDATE productos SET nombre = IFNULL(?, nombre), costo = IFNULL(?, costo), cantidad = IFNULL(?, cantidad), caducidad = IFNULL(?, caducidad), unidad = IFNULL(?, unidad), precio_venta = IFNULL(?, precio_venta), canmin = IFNULL(?, canmin) WHERE id_producto = ?",
      [nombre, costo, cantidad, caducidad, unidad, precio_venta, canmin, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        status: "error",
        message: "No se pudo actualizar el producto",
      });

    insumos.forEach(async (insumo) => {
      const [rows] = await poll.query(
        "UPDATE producto_insumos SET cantidad = IFNULL(?, cantidad) WHERE id_producto = ? AND id_insumo = ?",
        [insumo.cantidad, id, insumo.id]
      );

      if (rows.affectedRows === 0) {
        poll.query(
          "INSERT INTO producto_insumos (id_producto, id_insumo, cantidad) VALUES (?,?,?)",
          [id, insumo.id, insumo.cantidad]
        );
      }
    });

    res.json({
      status: "updated",
      message: "Producto actualizado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
