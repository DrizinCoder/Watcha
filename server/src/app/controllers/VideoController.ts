import { NextFunction, Request, Response } from "express";
import { DIVideoRepository } from "../containers/DIVideoRepository";
import { NotFoundError } from "../../infra/errors/CustomError";

class VideoController {
  private _get = DIVideoRepository.getGetUseCase();
  private _getByID = DIVideoRepository.getGetByIDUseCase();

  async create(req: Request, res: Response, next: NextFunction) {}

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const videos = await this._get.execute();

      return res.status(200).json(videos);
    } catch (e) {
      return next(e);
    }
  }

  async geByID(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new NotFoundError(`ID do vídeo não informado!`);
      }

      const video = await this._getByID.execute(id as string);

      return res.status(200).json(video);
    } catch (e) {
      return next(e);
    }
  }
}

export { VideoController };
