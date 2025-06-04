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
import SelectInput from "../inputs/SelectInput";

export default function CompanyRegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    company_size: "",
    industry: "",
    website: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = showLoadingAlert("Creating your account...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register/company/`,
        formData
      );
      localStorage.setItem("token", response.data.access);
      loading.close();
      await showSuccessAlert(
        "Success!",
        "Your company account has been created successfully."
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
        id="email"
        type="email"
        label="Email"
        placeholder="Enter company email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <PasswordInput
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <SelectInput
        id="company_size"
        label="Company Size"
        value={formData.company_size}
        onChange={(e) =>
          setFormData({ ...formData, company_size: e.target.value })
        }
        options={[
          { value: "", label: "Select company size" },
          { value: "small", label: "Small" },
          { value: "medium", label: "Medium" },
          { value: "large", label: "Large" },
        ]}
      />

      <FormInput
        id="industry"
        label="Industry"
        placeholder="Enter your industry"
        value={formData.industry}
        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
      />

      <FormInput
        id="website"
        type="url"
        label="Website"
        placeholder="Enter company website URL"
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
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
