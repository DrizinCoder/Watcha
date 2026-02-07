import { NextFunction, Request, Response, Router } from "express";
import { VideoController } from "../controllers/VideoController";
import { VideoStorage } from "../../core/services/VideoStorage";

const router = Router();
const controller = new VideoController();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  controller.get(req, res, next);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  controller.getByID(req, res, next);
});

router.get("/:id/play", (req: Request, res: Response, next: NextFunction) => {
  controller.play(req, res, next);
});

router.post(
  "/",
  VideoStorage.upload().single("video"),
  (req: Request, res: Response, next: NextFunction) => {
    controller.create(req, res, next);
  },
);

export { router as videoRoutes };
