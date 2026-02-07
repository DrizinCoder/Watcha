import { CreateVideoDTO, VideoDTO } from "../DTOs/videoDTOs";

interface IVideoRepository {
  create(data: CreateVideoDTO): Promise<number | null>;
  get(): Promise<VideoDTO[]>;
}

export { IVideoRepository };
