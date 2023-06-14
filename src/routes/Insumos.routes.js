import { Router } from "express";

import {
  getInsumos,
  getInsumo,
  delteInsumo,
  addInsumo,
  updatedInsumo
} from "../controllers/Insumos.controllers.js";
const router = Router();

router.get("/insumos", getInsumos);
router.get("/insumo/:id", getInsumo);
router.post("/insumo", addInsumo);
router.delete("/insumo", delteInsumo);
router.put("/insumo/:id", updatedInsumo);

export default router;
