import { VideoDTO } from "../../DTOs/videoDTOs";
import { IVideoRepository } from "../../interfaces/IVideoRepository";

class Get {
  constructor(private _repository: IVideoRepository) {}

  async execute(): Promise<VideoDTO[]> {
    return await this._repository.get();
  }
}

export { Get };
