import { spawn } from "child_process";
import path from "path";
import fs from "fs";

type EnqueueParams = {
  videoId: string;
  inputPath: string;
};

class VideoProcessor {
  private static instance: VideoProcessor;

  private constructor() {}

  static getInstance() {
    if (!VideoProcessor.instance) {
      VideoProcessor.instance = new VideoProcessor();
    }
    return VideoProcessor.instance;
  }

  enqueue({ videoId, inputPath }: EnqueueParams) {
    setImmediate(() => {
      this.process(videoId, inputPath);
    });
  }

  private process(videoId: string, inputPath: string) {
    const outputDir = path.resolve(process.cwd(), "uploads", "hls", videoId);

    fs.mkdirSync(outputDir, { recursive: true });

   const args = [
     "-y",
     "-i",
     inputPath,

     "-filter_complex",
     "[0:v]split=3[v1080][v720][v360];" +
       "[v720]scale=1280:720[v720out];" +
       "[v360]scale=640:360[v360out];" +
       "[0:a]asplit=3[a0][a1][a2]",

     // 1080p (original)
     "-map",
     "[v1080]",
     "-map",
     "[a0]",
     "-c:v:0",
     "libx264",
     "-b:v:0",
     "5000k",

     // 720p
     "-map",
     "[v720out]",
     "-map",
     "[a1]",
     "-c:v:1",
     "libx264",
     "-b:v:1",
     "2500k",

     // 360p
     "-map",
     "[v360out]",
     "-map",
     "[a2]",
     "-c:v:2",
     "libx264",
     "-b:v:2",
     "800k",

     "-c:a",
     "aac",
     "-ac",
     "2",
     "-b:a",
     "128k",

     "-f",
     "hls",
     "-hls_time",
     "6",
     "-hls_playlist_type",
     "vod",
     "-hls_flags",
     "independent_segments",

     "-hls_segment_filename",
     path.join(outputDir, "v%v", "segment_%03d.ts"),

     "-master_pl_name",
     "master.m3u8",

     "-var_stream_map",
     "v:0,a:0 v:1,a:1 v:2,a:2",

     path.join(outputDir, "v%v", "index.m3u8"),
   ];


    const ffmpeg = spawn("ffmpeg", args);

    ffmpeg.stderr.on("data", (data) => {
      console.log(`[FFMPEG ${videoId}] ${data.toString()}`);
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        console.log(`✅ Vídeo ${videoId} processado com sucesso`);
      } else {
        console.error(`❌ Erro ao processar vídeo ${videoId}`);
      }
    });
  }
}

export { VideoProcessor };
