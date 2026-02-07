import { NextFunction, Request, Response, Router } from "express";
import { VideoController } from "../controllers/VideoController";

const router = Router();
const controller = new VideoController();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  controller.get(req, res, next);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  controller.geByID(req, res, next);
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  controller.create(req, res, next);
});

export { router as videoRoutes };
