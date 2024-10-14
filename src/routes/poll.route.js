import pollController from "../controllers/poll.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middleware.js";

import { Router } from "express";

const pollRouter = Router();

pollRouter.get("/", pollController.findAllPollController);

pollRouter.use(authMiddleware);
pollRouter.post("/create", pollController.createPollController);

pollRouter.use(validId);
pollRouter.get("/byIdPoll/:id", pollController.findByIdPollController);
pollRouter.get("/byUserId", pollController.findPollByUserIdController);
pollRouter.put("/update/:id", pollController.updatePollController);
pollRouter.delete("/delete/:id", pollController.removePollController);
pollRouter.patch("/:id/vote", pollController.votePollController);

export default pollRouter;
