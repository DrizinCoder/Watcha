import express, { Application } from "express";
import cors from "cors";
import { router } from "./app/routers/router";
import { SQLiteConnection } from "./infra/databases/SQLite";
import { errorMiddleware } from "./app/middlewares/error";

const app: Application = express();

const startDB = async () => {
  await SQLiteConnection.getInstance();
};

startDB();

try {
  SQLiteConnection.getInstance();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "*",
    }),
  );

  app.use("/api", router);

  app.use(errorMiddleware);
} catch (error) {
  console.log("Erro: ", error);
}

export { app };
