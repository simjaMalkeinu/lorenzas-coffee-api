import { Router } from "express";

import { login, logout } from "../controllers/Login.controllers.js";

const router = Router();

router.get("/login", login);
router.get("/logout", logout);

export default router;
