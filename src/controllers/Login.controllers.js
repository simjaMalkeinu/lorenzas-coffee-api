//import database connection
import { poll } from "../db.js";

export const login = async (req, res) => {
  const { rfc, password } = req.body;

  try {
    const [rows] = await poll.query(
      "SELECT e.rfc, e.correo, CONCAT(e.nombre, ' ', e.apellido_paterno, ' ', e.apellido_materno) AS nombre, e.password, te.tipo, te.desc FROM empleado e, empleado_tipo et, tiposempleados te WHERE e.rfc = et.rfc_empleado AND et.id_tipo_empleado = te.id_tipo AND e.rfc = ?",
      [rfc]
    );

    if (rows.length <= 0)
      return res.status(404).json({ message: "RFC not found" });

    const dataUser = rows[0];

    if (dataUser.password !== password)
      return res.status(404).json({ message: "Password is  incorrect" });

    return res.json(dataUser);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const logout = (req, res) => {
  res.send("log out");
};

export const ping = async (req, res) => {
  const [result] = await poll.query("SELECT 1 + 1 AS result");
  res.json(result);
};
