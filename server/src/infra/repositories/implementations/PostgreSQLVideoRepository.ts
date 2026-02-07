import { CreateVideoDTO, VideoDTO } from "../../../core/DTOs/videoDTOs";
import { IVideoRepository } from "../../../core/interfaces/IVideoRepository";

class PostgreSQLVideoRepository implements IVideoRepository {
  get(): Promise<VideoDTO[]> {
    throw new Error("Method not implemented.");
  }
  create(data: CreateVideoDTO): Promise<number | null> {
    throw new Error("Method not implemented.");
  }
}

export { PostgreSQLVideoRepository };
