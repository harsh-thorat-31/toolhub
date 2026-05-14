import { useState } from "react";

import {
  Upload,
  FileText
} from "lucide-react";

import {
  analyzeResumeService
} from "../services/resumeService";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Toast from "../components/ui/Toast";

function ResumeAnalyzer() {

  const [file, setFile] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);

  const handleFileChange = (e) => {

    setFile(e.target.files[0]);
  };

  const analyzeResume = async () => {

    if (!file) {

      setToast({
        message: "Upload resume first",
        type: "error"
      });

      return;
    }

    try {

      setLoading(true);

      const data = await analyzeResumeService(file);

      setResult(data);

      setToast({
        message: "Resume analyzed successfully",
        type: "success"
      });

    } catch (error) {

      setToast({
        message: "Analysis failed",
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

      <Card className="w-full max-w-4xl">

        <h1 className="text-3xl font-bold mb-6">
          AI Resume Analyzer
        </h1>

        {/* UPLOAD */}

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
            Upload Resume PDF
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />

        </label>

        <Button
          onClick={analyzeResume}
          loading={loading}
        >
          Analyze Resume
        </Button>

        {
          result && (
            <div className="mt-10">

              {/* SCORE */}

              <div className="mb-8">

                <h2 className="text-2xl font-bold mb-3">
                  ATS Score
                </h2>

                <div className="w-full bg-gray-200 rounded-full h-6">

                  <div
                    className="
                      bg-green-600
                      h-6
                      rounded-full
                      text-white
                      text-sm
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      width: `${result.ats_score}%`
                    }}
                  >

                    {result.ats_score}%

                  </div>

                </div>

              </div>

              {/* FOUND SKILLS */}

              <div className="mb-8">

                <h2 className="text-xl font-bold mb-3">
                  Found Skills
                </h2>

                <div className="flex flex-wrap gap-3">

                  {
                    result.found_skills.map((skill, index) => (
                      <span
                        key={index}
                        className="
                          bg-green-100
                          text-green-700
                          px-4
                          py-2
                          rounded-full
                        "
                      >
                        {skill}
                      </span>
                    ))
                  }

                </div>

              </div>

              {/* MISSING SKILLS */}

              <div className="mb-8">

                <h2 className="text-xl font-bold mb-3">
                  Missing Skills
                </h2>

                <div className="flex flex-wrap gap-3">

                  {
                    result.missing_skills.map((skill, index) => (
                      <span
                        key={index}
                        className="
                          bg-red-100
                          text-red-700
                          px-4
                          py-2
                          rounded-full
                        "
                      >
                        {skill}
                      </span>
                    ))
                  }

                </div>

              </div>

              {/* SUGGESTIONS */}

              <div>

                <h2 className="text-xl font-bold mb-3">
                  Suggestions
                </h2>

                <div className="space-y-3">

                  {
                    result.suggestions.map((item, index) => (
                      <div
                        key={index}
                        className="
                          border
                          border-gray-200
                          rounded-xl
                          p-4
                        "
                      >
                        {item}
                      </div>
                    ))
                  }

                </div>

              </div>

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

export default ResumeAnalyzer;