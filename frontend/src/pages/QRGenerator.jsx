import { useState } from "react";
import { generateQRService } from "../services/qrService";

function QRGenerator() {

  const [text, setText] = useState("");
  const [qrImage, setQrImage] = useState(null);

  const generateQR = async () => {

    try {

      const blob = await generateQRService(text);

      const imageUrl = URL.createObjectURL(blob);

      setQrImage(imageUrl);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center p-5">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-5 text-center">
          QR Generator
        </h1>

        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={generateQR}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          Generate
        </button>

        {
          qrImage && (
            <div className="mt-5 text-center">

              <img
                src={qrImage}
                alt="QR"
                className="mx-auto mb-4"
              />

              <a
                href={qrImage}
                download="qr.png"
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Download
              </a>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default QRGenerator;