import { NextFunction, Request, Response } from "express";
import { DIVideoRepository } from "../containers/DIVideoRepository";
import { NotFoundError, ValidationError } from "../../infra/errors/CustomError";
import { StreamService } from "../../core/services/StreamService";

class VideoController {
  private _get = DIVideoRepository.getGetUseCase();
  private _getByID = DIVideoRepository.getGetByIDUseCase();
  private _play = DIVideoRepository.getPlayUseCase();
  private _create = DIVideoRepository.getCreateUseCase();

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, image_url } = req.body;

      if (!title || !description) {
        throw new ValidationError("Título e/ou descrição não informado.");
      }

      const file = req.file;

      if (!file) {
        throw new ValidationError(
          "Erro ao salvar vídeo! Arquivo não encontrado.",
        );
      }

      const id = await this._create.execute({
        title,
        description,
        image_url,
        path: `${file.filename}`,
      });

      return res.status(201).json({
        message: "Upload realizado com sucesso!",
        videoID: id,
      });
    } catch (e) {
      next(e);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const videos = await this._get.execute();

      return res.status(200).json({ videos: videos });
    } catch (e) {
      return next(e);
    }
  }

  async getByID(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new NotFoundError(`ID do vídeo não informado!`);
      }

      const video = await this._getByID.execute(id as string);

      return res.status(200).json({ video: video });
    } catch (e) {
      return next(e);
    }
  }

  async play(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new NotFoundError("ID do vídeo não informado!");
      }

      const videoPath = await this._play.execute(id as string);

      StreamService.streamVideo(req, res, videoPath);
    } catch (e) {
      next(e);
    }
  }
}

export { VideoController };
