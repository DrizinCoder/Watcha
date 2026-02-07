import { VideoRepository } from "../../repositories/VideoRepository";

class Get {
  constructor(private _repository: VideoRepository) {}

  async execute(): Promise<void> {
    return;
  }
}

export { Get };
