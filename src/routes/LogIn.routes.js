import { Router } from "express";

import { login, logout } from "../controllers/Login.controllers.js";

const router = Router();

router.post("/login", login);
router.get("/logout", logout);

export default router;
