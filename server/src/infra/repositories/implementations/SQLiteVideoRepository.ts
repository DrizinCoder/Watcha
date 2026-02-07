import { CreateVideoDTO, VideoDTO } from "../../../core/DTOs/videoDTOs";
import { IVideoRepository } from "../../../core/interfaces/IVideoRepository";
import { SQLiteConnection } from "../../databases/SQLite";

class SQLiteVideoRepository implements IVideoRepository {
  async create(data: CreateVideoDTO): Promise<number | null> {
    const db = await SQLiteConnection.getInstance();

    const result = await db.run(
      `
    INSERT INTO videos (title, description, image_url, path)
    VALUES (?, ?, ?, ?)
    `,
      [data.title, data.description ?? null, data.image_url ?? null, data.path],
    );

    return result.lastID!;
  }

  async get(): Promise<VideoDTO[]> {
    const db = await SQLiteConnection.getInstance();

    const rows = await db.all<VideoDTO[]>(
      `
      SELECT id, title, description, image_url
      FROM videos
      ORDER BY id DESC
      `,
    );

    return rows;
  }

  async getByID(id: number): Promise<VideoDTO | null> {
    const db = await SQLiteConnection.getInstance();

    const video = await db.get<VideoDTO>(
      `
    SELECT id, title, description, image_url, path
    FROM videos
    WHERE id = ?
    `,
      [id],
    );

    return video ?? null;
  }
}

export { SQLiteVideoRepository };
