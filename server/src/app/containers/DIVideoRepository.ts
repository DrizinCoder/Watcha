import { VideoRepository } from "../../core/repositories/VideoRepository";
import { Get } from "../../core/use-cases/video/Get";
import { GetByID } from "../../core/use-cases/video/GetByID";

class DIVideoRepository {
  private static _videoRepository = new VideoRepository();

  static getVideoRepository() {
    return this._videoRepository;
  }

  static getGetUseCase() {
    return new Get(this._videoRepository);
  }

  static getGetByIDUseCase() {
    return new GetByID(this._videoRepository);
  }
}

export { DIVideoRepository };
