import {
  useState
} from "react";

import {
  Upload,
  Music,
  Download
} from "lucide-react";

import { processAudioService } from "../services/musicservice";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Toast from "../components/ui/Toast";

function MusicEditor() {

  const [file, setFile] = useState(null);

  const [format, setFormat] = useState("mp3");

  const [start, setStart] = useState("");

  const [end, setEnd] = useState("");

  const [processedAudio, setProcessedAudio] =
    useState(null);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);

  const handleFileChange = (e) => {

    setFile(e.target.files[0]);
  };

  const processAudio = async () => {

    if (!file) {

      setToast({
        message: "Upload audio file first",
        type: "error"
      });

      return;
    }

    try {

      setLoading(true);

      const blob = await processAudioService(
        file,
        format,
        start,
        end
      );

      const fileUrl =
        URL.createObjectURL(blob);

      setProcessedAudio(fileUrl);

      setToast({
        message: "Audio processed successfully",
        type: "success"
      });

    } catch (error) {

      setToast({
        message: "Audio processing failed",
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

      <Card className="w-full max-w-3xl">

        <h1 className="text-3xl font-bold mb-6">
          Music Editor
        </h1>

        {/* FILE INPUT */}

        <label
          className="
            border-2
            border-dashed
            border-gray-300
            rounded-2xl
            p-10
            flex
            flex-col
            items-center
            justify-center
            cursor-pointer
            hover:border-black
            transition
            mb-6
          "
        >

          <Upload
            size={40}
            className="mb-3"
          />

          <p className="font-medium">
            Upload Audio File
          </p>

          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />

        </label>

        {/* FORMAT */}

        <div className="mb-6">

          <label className="block mb-2 font-medium">
            Output Format
          </label>

          <select
            value={format}
            onChange={(e) =>
              setFormat(e.target.value)
            }
            className="
              w-full
              border-2
              border-gray-200
              rounded-2xl
              p-4
            "
          >

            <option value="mp3">
              MP3
            </option>

            <option value="wav">
              WAV
            </option>

          </select>

        </div>

        {/* TRIM */}

        <div className="grid grid-cols-2 gap-4 mb-6">

          <Input
            type="number"
            value={start}
            onChange={(e) =>
              setStart(e.target.value)
            }
            placeholder="Start Time (sec)"
          />

          <Input
            type="number"
            value={end}
            onChange={(e) =>
              setEnd(e.target.value)
            }
            placeholder="End Time (sec)"
          />

        </div>

        {/* BUTTON */}

        <Button
          onClick={processAudio}
          loading={loading}
        >
          Process Audio
        </Button>

        {/* DOWNLOAD */}

        {
          processedAudio && (

            <a
              href={processedAudio}
              download={`processed.${format}`}
              className="
                mt-6
                bg-green-600
                text-white
                p-4
                rounded-2xl
                flex
                items-center
                justify-center
                gap-3
                hover:bg-green-700
                transition
              "
            >

              <Download />

              Download Audio

            </a>
          )
        }

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

export default MusicEditor;