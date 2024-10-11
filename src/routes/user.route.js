import { Router } from "express";
import {
  createService,
  findAllService,
  findByIdService,
  updateService,
} from "../services/user.service.js";
import { validId, validUser } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/", createService);
router.get("/", findAllService);
router.get("/:id", validId, validUser, findByIdService);
router.put("/:id", validId, validUser, updateService);

export default router;
