import {
  useState,
  useContext
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  loginService
} from "../services/authService";

import {
  AuthContext
} from "../context/AuthContext";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Toast from "../components/ui/Toast";

function Login() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
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

      const data = await loginService(formData);

      login(data);

      setToast({
        message: "Login successful",
        type: "success"
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {

      setToast({
        message: "Invalid credentials",
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

      <Card className="w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <div className="space-y-5 mb-6">

          <Input
            name="username"
            placeholder="Username"
            value={formData.username}
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
          Login
        </Button>

        <p className="mt-5 text-center">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2"
          >
            Register
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

export default Login;