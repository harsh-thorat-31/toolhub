import { useState } from "react";

import {
  Video,
  Music,
  Download
} from "lucide-react";

import {
  downloadVideoService
} from "../services/downloaderService";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Toast from "../components/ui/Toast";

function VideoDownloader() {

  const [url, setUrl] = useState("");

  const [type, setType] = useState("video");

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);

  const handleDownload = async () => {

    if (!url) {

      setToast({
        message: "Enter video URL",
        type: "error"
      });

      return;
    }

    try {

      setLoading(true);

      const blob = await downloadVideoService(
        url,
        type
      );

      const fileUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = fileUrl;

      a.download =
        type === "video"
          ? "video.mp4"
          : "audio.mp3";

      document.body.appendChild(a);

      a.click();

      a.remove();

      setToast({
        message: "Download started",
        type: "success"
      });

    } catch (error) {

      setToast({
        message: "Download failed",
        type: "error"
      });

    } finally {

      setLoading(false);

      setTimeout(() => {
        setToast(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">

      <Card className="w-full max-w-2xl">

        <h1 className="text-3xl font-bold mb-6">
          Video Downloader
        </h1>

        {/* URL INPUT */}

        <div className="mb-6">

          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste video URL..."
          />

        </div>

        {/* TYPE SELECT */}

        <div className="flex gap-4 mb-6">

          <button
            onClick={() => setType("video")}
            className={`
              flex-1
              p-4
              rounded-2xl
              border-2
              transition

              ${
                type === "video"
                  ? "bg-black text-white border-black"
                  : "border-gray-300"
              }
            `}
          >

            <Video className="mx-auto mb-2" />

            MP4 Video

          </button>

          <button
            onClick={() => setType("audio")}
            className={`
              flex-1
              p-4
              rounded-2xl
              border-2
              transition

              ${
                type === "audio"
                  ? "bg-black text-white border-black"
                  : "border-gray-300"
              }
            `}
          >

            <Music className="mx-auto mb-2" />

            MP3 Audio

          </button>

        </div>

        {/* BUTTON */}

        <Button
          onClick={handleDownload}
          loading={loading}
        >
          Download
        </Button>

      </Card>

      {
        toast && (
          <Toast
            message={toast.message}
            type={toast.type}
          />
        )
      }

    </div>
  );
}

export default VideoDownloader;