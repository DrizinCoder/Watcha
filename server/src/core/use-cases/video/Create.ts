import { ValidationError } from "../../../infra/errors/CustomError";
import { CreateVideoDTO } from "../../DTOs/videoDTOs";
import { IVideoRepository } from "../../interfaces/IVideoRepository";

class Create {
  constructor(private _repository: IVideoRepository) {}

  async execute(data: CreateVideoDTO): Promise<number | null> {
    const id = await this._repository.create(data);

    if (!id) {
      throw new ValidationError(
        "Erro ao salvar informações no banco de dados!",
      );
    }

    return id;
  }
}

export { Create };
