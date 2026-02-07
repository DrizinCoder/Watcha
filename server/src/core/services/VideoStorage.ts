import multer from "multer";
import path from "path";
import crypto from "crypto";

import { Request } from "express";

class VideoStorage {
  private static storage: multer.StorageEngine;
  private static uploadMiddleware: multer.Multer;

  private constructor() {}

  private static getStorage(): multer.StorageEngine {
    if (!VideoStorage.storage) {
      const uploadPath = path.resolve(process.cwd(), "uploads", "videos");

      VideoStorage.storage = multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb) => {
          cb(null, uploadPath);
        },

        filename: (req: Request, file: Express.Multer.File, cb) => {
          const ext = path.extname(file.originalname);
          const filename = `${crypto.randomUUID()}${ext}`;
          cb(null, filename);
        },
      });
    }

    return VideoStorage.storage;
  }

  public static upload() {
    if (!VideoStorage.uploadMiddleware) {
      VideoStorage.uploadMiddleware = multer({
        storage: VideoStorage.getStorage(),
        limits: {
          fileSize: 200 * 1024 * 1024, // 200MB
        },
      });
    }

    return VideoStorage.uploadMiddleware;
  }
}

export { VideoStorage };
