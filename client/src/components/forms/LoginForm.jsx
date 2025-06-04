import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  showSuccessAlert,
  showErrorAlert,
  showLoadingAlert,
} from "../../utils/alerts";
import PasswordInput from "../inputs/PasswordInput";
import FormInput from "../inputs/FormInput";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = showLoadingAlert("Logging in...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login/`,
        formData
      );
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("userType", response.data.user_type);
      loading.close();
      await showSuccessAlert("Success!", "You have successfully logged in.");
      navigate("/");
    } catch (err) {
      loading.close();
      const errorMessage =
        err.response?.data?.error || "An error occurred during login";
      showErrorAlert("Login Failed", errorMessage);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <FormInput
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <PasswordInput
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign in
      </button>
    </form>
  );
}
