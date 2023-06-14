import { poll } from "../db.js";

import Insumo from "../models/Insumo.js";

export const getInsumos = async (req, res) => {
  try {
    const [result] = await poll.query("SELECT * FROM insumos");

    result.length <= 0
      ? res
          .status(404)
          .json({ status: "not found", message: "No hay insumos registados" })
      : res.json(result);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getInsumo = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await poll.query(
      "SELECT * FROM insumos WHERE id_insumo = ?",
      [id]
    );

    result.length <= 0
      ? res
          .status(404)
          .json({ status: "not found", message: "No se encontro el insumo" })
      : res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const delteInsumo = async (req, res) => {
  const { id } = req.body;

  try {
    await poll.query("DELETE FROM producto_insumos WHERE id_insumo = ?", [id]);

    const [rows] = await poll.query("DELETE FROM insumos WHERE id_insumo = ?", [
      id,
    ]);

    return rows.affectedRows <= 0
      ? res.json({
          status: "incompleted",
          message: "No se encontro el insumo",
        })
      : res.json({
          status: "deleted",
          message: "Insumo eliminado exitosamente",
        });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const addInsumo = async (req, res) => {
  const insumo = new Insumo(req.body);

  console.log(insumo);

  try {
    const [rows] = await poll.query(
      "INSERT INTO insumos (nombre, costo, cantidad, caducidad, unidad, canmin) VALUES (?,?,?,?,?,?)",
      [
        insumo.nombre,
        insumo.costo,
        insumo.cantidad,
        insumo.caducidad,
        insumo.unidad,
        insumo.canmin,
      ]
    );

    return rows.insertId === 0
      ? res.json({
          status: "error",
          message: "No se pudo registrar el nuevo insumo",
        })
      : res.json({
          status: "created",
          message:
            "Insumo agregado correctamente con el id -> " + rows.insertId,
        });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updatedInsumo = async (req, res) => {
  const { id } = req.params;
  const { nombre, costo, cantidad, caducidad, unidad, canmin } = req.body;
  try {
    const [result] = await poll.query(
      "UPDATE insumos SET nombre = IFNULL(?, nombre), costo = IFNULL(?, costo), cantidad = IFNULL(?, cantidad), caducidad = IFNULL(?, caducidad), unidad = IFNULL(?, unidad), canmin = IFNULL(?, canmin) WHERE id_insumo = ?",
      [nombre, costo, cantidad, caducidad, unidad, canmin, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        status: "error",
        message: "No se pudo actualizar el insumo",
      });

    res.json({
      status: "updated",
      message: "Insumo actualizado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
