import { Router } from "express";
import { getReporte, getReportes } from "../controllers/Reportes.controllers.js";

const router = Router();

router.get("/reportes", getReportes);
router.get("/reporte/:id/:operacion", getReporte);

export default router;
