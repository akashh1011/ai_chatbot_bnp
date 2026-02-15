import React, { useState } from "react";
import InputField from "./InputField";

const Auth = ({ setAuthToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    //const API_URL = process.env.API_URL;

    try {
      const response = await fetch(`https://ai-chatbot-bnp.onrender.com${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setAuthToken(data.token);
      } else {
        setError(
          data.message ||
            "Something went wrong. Please check your credentials.",
        );
      }
    } catch (err) {
      setError("Server is not responding. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-md p-10 bg-white border border-gray-100 shadow-xl rounded-3xl">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-900">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 border border-red-100 bg-red-50 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-6">
          {isLogin === false && (
            <InputField
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
            />
          )}
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="name@company.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••••"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
          >
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        <p className="mt-8 text-sm text-center text-gray-500">
          {isLogin ? "New to our AI?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 font-bold text-blue-600 transition-colors hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
