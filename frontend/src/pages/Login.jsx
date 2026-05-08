import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { MdOutlineNotes } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    try {
      const response = await axiosInstance.post("/login", { email, password });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.data?.message) setError(err.response.data.message);
      else setError("An unexpected error occurred. Please try again");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-violet-300">
            <MdOutlineNotes className="text-white text-2xl" />
          </div>
          <span className="text-2xl font-bold text-slate-800">Notely</span>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-violet-100 border border-violet-100 px-8 py-9">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome back</h2>
          <p className="text-sm text-slate-400 mb-7">Sign in to your account to continue</p>

          <form onSubmit={handleLogin}>
            <label className="input-label">Email</label>
            <input
              type="text"
              placeholder="you@example.com"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="input-label">Password</label>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && (
              <p className="text-red-600 text-xs bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 mb-3">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary mt-2">
              Sign In
            </button>
          </form>

          <p className="text-sm text-center text-slate-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/signUp" className="font-semibold text-primary hover:text-violet-700 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
