import { useState } from "react";

import {
  Copy,
  Check
} from "lucide-react";

import {
  createShortUrlService
} from "../services/urlShortenerService";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Toast from "../components/ui/Toast";

function UrlShortener() {

  const [url, setUrl] = useState("");

  const [shortUrl, setShortUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  const [toast, setToast] = useState(null);

  const generateShortUrl = async () => {

    try {

      setLoading(true);

      const data = await createShortUrlService(url);

      setShortUrl(data.short_url);

    } catch (error) {

      setToast({
        message: "Failed to shorten URL",
        type: "error"
      });

    } finally {

      setLoading(false);
    }
  };

  const copyUrl = async () => {

    if (!shortUrl) return;

    await navigator.clipboard.writeText(shortUrl);

    setCopied(true);

    setToast({
      message: "Short URL copied!",
      type: "success"
    });

    setTimeout(() => {

      setCopied(false);
      setToast(null);

    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">

      <Card className="w-full max-w-xl">

        <h1 className="text-3xl font-bold mb-6">
          URL Shortener
        </h1>

        <div className="mb-5">

          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter long URL..."
          />

        </div>

        <Button
          onClick={generateShortUrl}
          loading={loading}
        >
          Generate Short URL
        </Button>

        {
          shortUrl && (
            <div className="mt-6 border-2 border-gray-200 rounded-2xl p-4 flex items-center gap-3">

              <Input
                value={shortUrl}
                readOnly
                className="border-none p-0 focus:ring-0"
              />

              <button
                onClick={copyUrl}
                className="hover:scale-110 transition"
              >

                {
                  copied ? (
                    <Check className="text-green-600" />
                  ) : (
                    <Copy />
                  )
                }

              </button>

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

export default UrlShortener;