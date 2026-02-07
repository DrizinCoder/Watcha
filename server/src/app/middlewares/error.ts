import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../infra/errors/Errors";

function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Internal Server Error",
  });
}

export { errorMiddleware };
