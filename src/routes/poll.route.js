import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  findById,
  update,
  remove,
  vote,
} from "../controllers/poll.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/:id", findById);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);
router.patch("/:id/vote", vote);

export default router;
