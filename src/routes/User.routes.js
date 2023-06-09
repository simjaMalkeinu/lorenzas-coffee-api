import { Router } from "express";

import { users, user, newUser } from "../controllers/User.controllers.js";

const router = Router();

router.get("/users", users);
router.get("/user", user);
router.post('/newUser', newUser)


export default router;