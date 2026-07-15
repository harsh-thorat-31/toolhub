import { useState } from "react";

import {
  Copy,
  Check,
  Loader2
} from "lucide-react";

import { generatePasswordService } from "../services/passwordService";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Toast from "../components/ui/Toast";


function PasswordGenerator() {

  const [password, setPassword] = useState("");

  const [length, setLength] = useState(12);

  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const [loading, setLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  const [toast, setToast] = useState(null);

  const generatePassword = async () => {

    try {

      setLoading(true);

      const payload = {
        length,
        uppercase,
        lowercase,
        numbers,
        symbols
      };

      const data = await generatePasswordService(payload);

      setPassword(data.password);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

 const copyPassword = async () => {

  if (!password) return;

  await navigator.clipboard.writeText(password);

  setCopied(true);

  setToast({
    message: "Password copied!",
    type: "success"
  });

  setTimeout(() => {
    setCopied(false);
    setToast(null);
  }, 2000);
};

  const getStrength = () => {

    if (length >= 16 && symbols && numbers) {
      return {
        text: "Strong",
        color: "text-green-600"
      };
    }

    if (length >= 10) {
      return {
        text: "Medium",
        color: "text-yellow-500"
      };
    }

    return {
      text: "Weak",
      color: "text-red-500"
    };
  };

  const strength = getStrength();

  return (
    <div className="flex-1 flex justify-center items-center p-5">

      <Card className="w-full max-w-lg">


        <h1 className="text-3xl font-bold mb-6">
          Password Generator
        </h1>

        {/* PASSWORD BOX */}

        <div className="border-2 border-gray-200 rounded-2xl p-3 flex items-center gap-3 mb-6">

          <Input
            value={password}
            placeholder="Generated password..."
            readOnly
            className="border-none p-0 focus:ring-0"
/>

          <button
            onClick={copyPassword}
            className="transition duration-300 hover:scale-110"
          >

            {
              copied ? (
                <Check className="text-green-600" />
              ) : (
                <Copy className="text-gray-700" />
              )
            }

          </button>

        </div>

        {/* LENGTH */}

        <div className="mb-6">

          <div className="flex justify-between mb-2">

            <label className="font-medium">
              Password Length
            </label>

            <span className="font-bold">
              {length}
            </span>

          </div>

          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full cursor-pointer"
          />

        </div>

        {/* OPTIONS */}

        <div className="grid grid-cols-2 gap-4 mb-6">

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={uppercase}
              onChange={() => setUppercase(!uppercase)}
            />

            Uppercase

          </label>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={lowercase}
              onChange={() => setLowercase(!lowercase)}
            />

            Lowercase

          </label>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
            />

            Numbers

          </label>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
            />

            Symbols

          </label>

        </div>

        {/* STRENGTH */}

        <div className="mb-6">

          <p className="font-semibold">

            Strength:
            <span className={`ml-2 ${strength.color}`}>
              {strength.text}
            </span>

          </p>

        </div>

        {/* BUTTON */}

        <Button onClick={generatePassword} loading={loading}>
          Generate Password
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

export default PasswordGenerator;