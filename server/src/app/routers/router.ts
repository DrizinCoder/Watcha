import { Router } from "express";
import { defaultRoutes } from "./default.routes";
import { videoRoutes } from "./video.routes";

const router = Router();

router.use(defaultRoutes);
router.use("/video", videoRoutes);

export { router };
