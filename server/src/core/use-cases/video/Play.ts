// core/use-cases/video/Play.ts
import { NotFoundError } from "../../../infra/errors/CustomError";
import { IVideoRepository } from "../../interfaces/IVideoRepository";

class Play {
  constructor(private _repository: IVideoRepository) {}

  async execute(id: string): Promise<string> {
    const video = await this._repository.getByID(Number(id));

    if (!video) {
      throw new NotFoundError("Vídeo não encontrado");
    }

    return video.path;
  }
}

export { Play };
