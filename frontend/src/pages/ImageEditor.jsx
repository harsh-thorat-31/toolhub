import { useState } from "react";

import {
  Upload,
  Download,
  Image as ImageIcon
} from "lucide-react";

import {
  processImageService
} from "../services/imageService";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Toast from "../components/ui/Toast";

function ImageEditor() {

  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState(null);

  const [processedImage, setProcessedImage] = useState(null);

  const [width, setWidth] = useState("");

  const [height, setHeight] = useState("");

  const [grayscale, setGrayscale] = useState(false);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);

  const handleImageChange = (e) => {

    const selectedFile = e.target.files[0];

    setFile(selectedFile);

    setPreview(
      URL.createObjectURL(selectedFile)
    );
  };

  const processImage = async () => {

    if (!file) {

      setToast({
        message: "Select an image first",
        type: "error"
      });

      return;
    }

    try {

      setLoading(true);

      const blob = await processImageService(
        file,
        width,
        height,
        grayscale
      );

      const imageUrl = URL.createObjectURL(blob);

      setProcessedImage(imageUrl);

      setToast({
        message: "Image processed successfully!",
        type: "success"
      });

    } catch (error) {

      setToast({
        message: "Failed to process image",
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
          Image Editor
        </h1>

        {/* IMAGE UPLOAD */}

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

          <Upload size={40} className="mb-3" />

          <p className="font-medium">
            Upload Image
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

        </label>

        {/* PREVIEW */}

        {
          preview && (
            <div className="mb-6">

              <h2 className="font-semibold mb-3">
                Original Image
              </h2>

              <img
                src={preview}
                alt="Preview"
                className="
                  rounded-2xl
                  max-h-80
                  object-contain
                  border
                "
              />

            </div>
          )
        }

        {/* CONTROLS */}

        <div className="grid grid-cols-2 gap-4 mb-6">

          <Input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Width"
          />

          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height"
          />

        </div>

        {/* GRAYSCALE */}

        <label className="flex items-center gap-3 mb-6">

          <input
            type="checkbox"
            checked={grayscale}
            onChange={() => setGrayscale(!grayscale)}
          />

          Convert to Grayscale

        </label>

        {/* BUTTON */}

        <Button
          onClick={processImage}
          loading={loading}
        >
          Process Image
        </Button>

        {/* RESULT */}

        {
          processedImage && (
            <div className="mt-8">

              <h2 className="font-semibold mb-4">
                Processed Image
              </h2>

              <img
                src={processedImage}
                alt="Processed"
                className="
                  rounded-2xl
                  max-h-80
                  object-contain
                  border
                  mb-5
                "
              />

              <a
                href={processedImage}
                download="processed-image.png"
                className="
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

                Download Image

              </a>

            </div>
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

export default ImageEditor;