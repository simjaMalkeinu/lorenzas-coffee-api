import { Router } from "express";

import {
  login,
  logout,
  ping
} from "../controllers/Login.controllers.js";

const router = Router();

router.get("/login", login);
router.get("/logout", logout);
router.get("/ping", ping);

export default router;
