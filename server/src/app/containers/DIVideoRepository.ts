import { Create } from "../../core/use-cases/video/Create";
import { Get } from "../../core/use-cases/video/Get";
import { GetByID } from "../../core/use-cases/video/GetByID";
import { Play } from "../../core/use-cases/video/Play";
import { VideoRepositoryAdapter } from "../../infra/repositories/VideoRepositoryAdapter";

class DIVideoRepository {
  private static repository = VideoRepositoryAdapter.getInstance();

  static getCreateUseCase() {
    return new Create(this.repository);
  }

  static getGetUseCase() {
    return new Get(this.repository);
  }

  static getGetByIDUseCase() {
    return new GetByID(this.repository);
  }

  static getPlayUseCase() {
    return new Play(this.repository);
  }
}

export { DIVideoRepository };
