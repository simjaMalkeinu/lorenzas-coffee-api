import { poll } from "../db.js";

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
