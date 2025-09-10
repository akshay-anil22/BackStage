import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
import Navbar from "../components/Navbar";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/api/login", formData);
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="theme-dawn1 min-h-screen bg-cover bg-center relative ">
      <Navbar />

      {/* Main container */}
      <main className="flex items-center justify-center pt-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Form Card */}
          <div className="theme-dawn1 rounded-2xl p-8 border 
  border-white/20 
  backdrop-blur-[80px] 
  shadow-[inset_0_0_.5px_#ffffff80,inset_-1px_-1px_.5px_#ffffff85,1.2px_1.2px_1px_#0003,-1.2px_-1.2px_.4px_#0000002e] sm:p-10" 
        >
            <h2 className="text-center text-3xl font-mourand text-gray-900 dark:text-black mb-6">
              Welcome Back
            </h2>

            {/* Error Message */}
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6"
                role="alert"
              >
                <strong className="font-bold">Oops! </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {/* Email Input */}
              <div className="mb-3">
                <p className="pl-1 font-mourand text-3xl">Email Address</p>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-lg relative block w-full px-2 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-200 text-gray-900 dark:text-black bg-white dark:bg-gray-200 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              {/* Password Input */}
              <div className="mb-5">
                <p className="pl-1 font-mourand text-3xl">Password</p>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-lg relative block w-full px-2 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-200 text-gray-900 dark:text-black bg-white dark:bg-gray-200 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>

              {/* Submit Button */}
              <div className="mb-3 flex items-center justify-center">
                <button
                  type="submit"
                  className="flex justify-center py-2 px-5 border border-transparent font-mourand text-2xl rounded-lg text-accent bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform transform hover:scale-105"
                >
                  Login
                </button>
              </div>
            </form>

            {/* Register Redirect */}
            <p className="mt-6 text-center font-mourand text-2xl text-black">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="font-mourand text-2xl text-cyan-900 hover:text-cyan-700"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
