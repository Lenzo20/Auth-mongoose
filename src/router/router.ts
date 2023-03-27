import { Router } from "express";
import userControllers from "../controllers/userControllers";

const router = Router();

router.get("/test", (req, res) => {
    return res.status(200).json({ ok: true });
})

router.get("/users", userControllers.find);
router.post("/users", userControllers.create);
router.patch("/users", userControllers.uptade);

export default router;