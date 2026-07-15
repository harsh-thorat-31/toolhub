import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  registerService
} from "../services/authService";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Toast from "../components/ui/Toast";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

    try {

      setLoading(true);

      await registerService(formData);

      setToast({
        message: "Registration successful",
        type: "success"
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {

      setToast({
        message: "Registration failed",
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

      <Card className="w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <div className="space-y-5 mb-6">

          <Input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

        </div>

        <Button
          onClick={handleSubmit}
          loading={loading}
        >
          Register
        </Button>

        <p className="mt-5 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

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

export default Register;