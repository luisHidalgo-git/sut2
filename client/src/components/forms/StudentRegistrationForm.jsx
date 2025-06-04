import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  showSuccessAlert,
  showErrorAlert,
  showLoadingAlert,
} from "../../utils/alerts";
import FormInput from "../inputs/FormInput";
import PasswordInput from "../inputs/PasswordInput";

export default function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    career: "",
    semester: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = showLoadingAlert("Creating your account...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register/student/`,
        formData
      );
      localStorage.setItem("token", response.data.access);
      loading.close();
      await showSuccessAlert(
        "Success!",
        "Your student account has been created successfully."
      );
      navigate("/");
    } catch (err) {
      loading.close();
      const errorMessage =
        err.response?.data?.username?.[0] ||
        err.response?.data?.email?.[0] ||
        "Registration failed";
      showErrorAlert("Registration Failed", errorMessage);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <FormInput
        id="username"
        label="Username"
        placeholder="Choose a username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />

      <FormInput
        id="first_name"
        label="First Name"
        placeholder="Enter your first name"
        value={formData.first_name}
        onChange={(e) =>
          setFormData({ ...formData, first_name: e.target.value })
        }
      />

      <FormInput
        id="last_name"
        label="Last Name"
        placeholder="Enter your last name"
        value={formData.last_name}
        onChange={(e) =>
          setFormData({ ...formData, last_name: e.target.value })
        }
      />

      <FormInput
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <PasswordInput
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <FormInput
        id="career"
        label="Career"
        placeholder="Enter your field of study"
        value={formData.career}
        onChange={(e) => setFormData({ ...formData, career: e.target.value })}
      />

      <FormInput
        id="semester"
        type="number"
        label="Semester"
        placeholder="Current semester number"
        value={formData.semester}
        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
      />

      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Register
      </button>
    </form>
  );
}
