import {Router} from "express";
import userRouter from "./user.route.js";
import pollRouter from "./poll.route.js";
import authRouter from "./auth.route.js";

const router = Router();

router.use("/user", userRouter);
router.use("/polls", pollRouter);
router.use("/auth", authRouter);

export default router;