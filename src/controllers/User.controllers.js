import { poll } from "../db.js";

import User from "../models/User.js";

export const users = async (req, res) => {
  try {
    const [rows] = await poll.query(
      "SELECT e.rfc, e.correo, CONCAT(e.nombre, ' ', e.apellido_paterno, ' ', e.apellido_materno) AS nombre, e.password, te.tipo, te.desc FROM empleado e, empleado_tipo et, tiposempleados te WHERE e.rfc = et.rfc_empleado AND et.id_tipo_empleado = te.id_tipo"
    );

    if (rows.length <= 0)
      return res.status(404).json({ message: "no registered users" });

    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const user = async (req, res) => {
  const { rfc } = req.params;
  try {
    const [rows] = await poll.query(
      "SELECT e.rfc, e.correo, CONCAT(e.nombre, ' ', e.apellido_paterno, ' ', e.apellido_materno) AS nombre, e.password, te.tipo, te.desc FROM empleado e, empleado_tipo et, tiposempleados te WHERE e.rfc = et.rfc_empleado AND et.id_tipo_empleado = te.id_tipo AND e.rfc = ?",
      [rfc]
    );

    if (rows.length <= 0)
      return res.status(404).json({ message: "no registered users" });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const newUser = async (req, res) => {
  const { password } = req.body;

  const user = new User(req.body);

  user.password = await user.encryptPassword(password);

  try {
    const [result] = await poll.query(
      "INSERT INTO `empleado` (`rfc`, `correo`, `password`, `nombre`, `apellido_paterno`, `apellido_materno`) VALUES (?,?,?,?,?,?)",
      [user.rfc, user.correo, user.password, user.nombre, user.apellido_paterno, user.apellido_materno]
    );

    if (result.affectedRows !== 1)
      return res.status(500).json({ message: "No se pudo crear el usuario" });

    const [result2] = await poll.query(
      "INSERT INTO `empleado_tipo` (`rfc_empleado`, `id_tipo_empleado`) VALUES (?,?)",
      [user.rfc, user.tipo]
    );

    if (result2.affectedRows !== 1)
      return res.status(500).json({ message: "No se asignar el tipo de usuario correctamente" });

    return res.json({message: "Usuario creado satisfactoriamente"})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

};
