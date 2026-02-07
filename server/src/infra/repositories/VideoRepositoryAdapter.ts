import { IVideoRepository } from "../../core/interfaces/IVideoRepository";
import { SQLiteVideoRepository } from "./implementations/SQLiteVideoRepository";

class VideoRepositoryAdapter {
  private static instance: IVideoRepository;

  private constructor() {}

  public static getInstance(): IVideoRepository {
    if (!VideoRepositoryAdapter.instance) {
      VideoRepositoryAdapter.instance = new SQLiteVideoRepository();
    }

    return VideoRepositoryAdapter.instance;
  }
}

export { VideoRepositoryAdapter };
