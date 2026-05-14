import {
  useState
} from "react";

import Editor from "@monaco-editor/react";

import {
  Copy,
  Check,
  Minimize2,
  Wand2
} from "lucide-react";

import {
  formatCodeService,
  minifyCodeService
} from "../services/codeFormatterService";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Toast from "../components/ui/Toast";

function CodeFormatter() {

  const [code, setCode] = useState(
`function hello(name){console.log("Hello "+name)}`
  );

  const [copied, setCopied] = useState(false);

  const [toast, setToast] = useState(null);

  const [loading, setLoading] = useState(false);

  const formatCode = async () => {

    try {

      setLoading(true);

      const formatted =
        await formatCodeService(code);

      setCode(formatted);

      setToast({
        message: "Code formatted successfully",
        type: "success"
      });

    } catch (error) {

      setToast({
        message: "Invalid code",
        type: "error"
      });

    } finally {

      setLoading(false);

      setTimeout(() => {
        setToast(null);
      }, 2000);
    }
  };

  const minifyCode = async () => {

    try {

      setLoading(true);

      const minified =
        await minifyCodeService(code);

      setCode(minified);

      setToast({
        message: "Code minified successfully",
        type: "success"
      });

    } catch (error) {

      setToast({
        message: "Invalid code",
        type: "error"
      });

    } finally {

      setLoading(false);

      setTimeout(() => {
        setToast(null);
      }, 2000);
    }
  };

  const copyCode = async () => {

    await navigator.clipboard.writeText(code);

    setCopied(true);

    setToast({
      message: "Code copied",
      type: "success"
    });

    setTimeout(() => {

      setCopied(false);

      setToast(null);

    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <Card className="w-full">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Code Formatter
          </h1>

          <button
            onClick={copyCode}
            className="
              border
              border-gray-300
              rounded-xl
              p-3
              hover:bg-gray-100
              transition
            "
          >

            {
              copied
                ? <Check className="text-green-600" />
                : <Copy />
            }

          </button>

        </div>

        {/* ACTIONS */}

        <div className="flex gap-4 mb-6">

          <Button
            onClick={formatCode}
            loading={loading}
            className="flex-1"
          >

            <Wand2 />

            Format Code

          </Button>

          <Button
            onClick={minifyCode}
            loading={loading}
            className="flex-1"
          >

            <Minimize2 />

            Minify Code

          </Button>

        </div>

        {/* EDITOR */}

        <div className="rounded-2xl overflow-hidden border">

          <Editor
            height="600px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
          />

        </div>

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

export default CodeFormatter;