//import database connection
import { poll } from "../db.js";

export const login = async (req, res) => {
  const { rfc, password } = req.body;

  try {
    const [rows] = await poll.query("SELECT * FROM empleado WHERE rfc = ?", [
      rfc,
    ]);

    if (rows.length <= 0) res.status(404).json({ message: "RFC not found" });

    const dataUser = rows[0];

    dataUser.password !== password
      ? res.status(404).json({ message: "Password is  incorrect" })
      : res.json(dataUser);
      
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};

export const logout = (req, res) => {
  res.send("log out");
};

export const ping = async (req, res) => {
  const [result] = await poll.query("SELECT 1 + 1 AS result");
  res.json(result);
};
