import { IVideoRepository } from "../../interfaces/IVideoRepository.js";

class Play {
  constructor(private _repository: IVideoRepository) {}

  async execute(): Promise<void> {
    return;
  }
}

export { Play };
