import { useState } from "react";

import { Upload, Download } from "lucide-react";

import { mergePdfService } from "../services/pdfService";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Toast from "../components/ui/Toast";

function PDFToolkit() {

  const [files, setFiles] = useState([]);

  const [mergedPdf, setMergedPdf] = useState(null);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);

  const handleFileChange = (e) => {

    setFiles(Array.from(e.target.files));
  };

  const mergePdfs = async () => {

    if (files.length < 2) {

      setToast({
        message: "Select at least 2 PDFs",
        type: "error"
      });

      return;
    }

    try {

      setLoading(true);

      const blob = await mergePdfService(files);

      const fileUrl = URL.createObjectURL(blob);

      setMergedPdf(fileUrl);

      setToast({
        message: "PDFs merged successfully!",
        type: "success"
      });

    } catch (error) {

      setToast({
        message: "Failed to merge PDFs",
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
    <div className="flex-1 flex justify-center items-center p-5">

      <Card className="w-full max-w-2xl">

        <h1 className="text-3xl font-bold mb-6"> PDF Toolkit </h1>

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
            mb-6">

          <Upload size={40} className="mb-3" />

          <p className="font-medium"> Upload PDF Files </p>

          <p className="text-sm text-gray-500"> Select multiple PDFs </p>

          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden" />

        </label>

        {/* FILE LIST */}

        {
          files.length > 0 && (
            <div className="mb-6">

              <h2 className="font-semibold mb-3"> Selected Files </h2>

              <div className="space-y-2">

                {
                  files.map((file, index) => (
                    <div key={index}className=" border border-gray-200 rounded-xl p-3 text-sm">
                      {file.name}
                    </div>
                  ))
                }

              </div>

            </div>
          )
        }

        {/* BUTTON */}

        <Button onClick={mergePdfs} loading={loading} >
          Merge PDFs
        </Button>

        {/* DOWNLOAD */}

        {
          mergedPdf && (
            <a
              href={mergedPdf}
              download="merged.pdf"
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

              Download Merged PDF

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

export default PDFToolkit;