"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/ui/navbar/navbar";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Settings,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { videoService } from "@/services/api";

export default function WatchVideo() {
  const [video, setVideo] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const params = useParams();
  const videoId = params.id as string;

  useEffect(() => {
    videoService
      .getById(videoId)
      .then((data) => {
        const videoData = data.videos?.[0] || data;
        setVideo(videoData);
      })
      .catch((err) => console.error(err));
  }, [videoId]);

  useEffect(() => {
    if (!videoRef.current) return;
    const videoEl = videoRef.current;
    const hlsUrl = `http://localhost:3030/streams/${videoId}/master.m3u8`;

    if (Hls.isSupported()) {
      const hls = new Hls({ autoStartLoad: true, capLevelToPlayerSize: true });
      hls.loadSource(hlsUrl);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => setHlsInstance(hls));
      return () => hls.destroy();
    } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = hlsUrl;
    }
  }, [videoId]);

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const togglePlay = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skip = (amount: number) => {
    if (videoRef.current) videoRef.current.currentTime += amount;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto p-4 lg:p-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para a galeria</span>
        </Link>

        <div
          ref={containerRef}
          className="relative group bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 aspect-video"
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          <video
            ref={videoRef}
            className="w-full h-full cursor-pointer"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <div
            className={`absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent transition-opacity duration-300 flex flex-col justify-end p-4 lg:p-6 ${showControls ? "opacity-100" : "opacity-0"}`}
          >
            <div className="group/progress relative w-full h-1.5 mb-4 flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="absolute w-full h-full appearance-none bg-zinc-600 accent-blue-600 cursor-pointer rounded-full outline-none opacity-0 group-hover/progress:opacity-100 transition-opacity z-10"
              />
              <div className="w-full h-full bg-zinc-600/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 lg:gap-6">
                <button
                  onClick={togglePlay}
                  className="hover:text-blue-500 transition-colors"
                >
                  {isPlaying ? (
                    <Pause fill="currentColor" size={24} />
                  ) : (
                    <Play fill="currentColor" size={24} />
                  )}
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => skip(-10)}
                    className="hover:text-zinc-300"
                  >
                    <RotateCcw size={22} />
                  </button>
                  <button
                    onClick={() => skip(10)}
                    className="hover:text-zinc-300"
                  >
                    <RotateCw size={22} />
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-2 group/volume">
                  <button
                    onClick={() => {
                      const newMute = !isMuted;
                      setIsMuted(newMute);
                      if (videoRef.current) videoRef.current.muted = newMute;
                    }}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={22} />
                    ) : (
                      <Volume2 size={22} />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-0 group-hover/volume:w-20 transition-all duration-300 appearance-none bg-zinc-600 accent-white h-1 rounded-full cursor-pointer"
                  />
                </div>

                <div className="text-sm font-mono text-zinc-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-zinc-800/80 border border-zinc-700 px-3 py-1.5 rounded-lg text-sm transition-hover hover:bg-zinc-700">
                  <Settings size={14} className="text-zinc-400" />
                  <select
                    className="bg-transparent outline-none cursor-pointer appearance-none"
                    onChange={(e) =>
                      hlsInstance &&
                      (hlsInstance.currentLevel = Number(e.target.value))
                    }
                    defaultValue={-1}
                  >
                    <option value={-1} className="bg-zinc-900">
                      Auto
                    </option>
                    {hlsInstance?.levels.map((l, i) => (
                      <option key={i} value={i} className="bg-zinc-900">
                        {l.height}p
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="hover:text-blue-500 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize size={24} />
                  ) : (
                    <Maximize size={24} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight">{video?.title}</h1>
          <p className="mt-4 text-zinc-400 max-w-3xl leading-relaxed">
            {video?.description}
          </p>
        </div>
      </main>
    </div>
  );
}
