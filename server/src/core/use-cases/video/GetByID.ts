import { VideoRepository } from "../../repositories/VideoRepository";

class GetByID {
  constructor(private _repository: VideoRepository) {}

  async execute(id: string): Promise<void> {
    return;
  }
}

export { GetByID };
