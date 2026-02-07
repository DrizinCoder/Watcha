import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

class SQLiteConnection {
  private static instance: Database | null = null;

  private constructor() {}

  public static async getInstance(): Promise<Database> {
    if (!SQLiteConnection.instance) {
      const dbPath = path.resolve(__dirname, "../../../database.sqlite");

      SQLiteConnection.instance = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });

      await SQLiteConnection.instance.exec(`
        CREATE TABLE IF NOT EXISTS videos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          image_url TEXT,
          path TEXT NOT NULL
        )
      `);

      console.log("Banco SQLite carregado com sucesso.");
    }

    return SQLiteConnection.instance;
  }
}

export { SQLiteConnection };
