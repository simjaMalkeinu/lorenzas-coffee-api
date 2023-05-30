//import database connection
import { poll } from "../db.js";


export const login = (req, res) => {
  res.send("log in");
};

export const logout = (req, res) => {
  res.send("log out");
};

export const ping = async (req, res) => {
    const [result] = await poll.query("SELECT 1 + 1 AS result");
    res.json(result);
  }
