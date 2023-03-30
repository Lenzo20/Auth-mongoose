import { Router } from "express";

import authUserControllers from "../controllers/authUserControllers";
import userControllers from "../controllers/userControllers";
import { ApiError, NotFoundError } from './../helpers/apiError';
import { authMiddlewares } from './../middlewares/authMiddlewares';

const router = Router();

router.get("/test", (req, res) => {
  throw new NotFoundError("Caiu na api de test");
})

router.get("/users", new userControllers().find);
router.post("/users", new userControllers().create);
router.patch("/users/:id", new userControllers().uptade);
router.delete("/users/:id", new userControllers().delete);

// Login
router.post("/auth/users", new authUserControllers().authUser);

router.use(authMiddlewares)

// Logado
router.get("/auth/users", new authUserControllers().getProfile); // em test tratamento de erro

export default router;
