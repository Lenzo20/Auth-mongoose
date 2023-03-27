import { authMiddlewares } from './../middlewares/authMiddlewares';
import { Router } from "express";

import authUserControllers from "../controllers/authUserControllers";
import userControllers from "../controllers/userControllers";

const router = Router();

router.get("/test", (req, res) => {
  return res.status(200).json({ ok: true });
})

router.get("/users", userControllers.find);
router.post("/users", userControllers.create);
router.patch("/users/:id", userControllers.uptade);
router.delete("/users/:id", userControllers.delete);

// Login
router.post("/auth/users", authUserControllers.authUser);

router.use(authMiddlewares)

// Logado
router.get("/auth/users", authUserControllers.getProfile);

export default router;
