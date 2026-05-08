import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { MdOutlineNotes } from "react-icons/md";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name");
      return;
    }
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
      const response = await axiosInstance.post("/signup", {
        fullName: name,
        email,
        password,
      });
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
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
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Create account</h2>
          <p className="text-sm text-slate-400 mb-7">Start capturing your ideas today</p>

          <form onSubmit={handleSignUp}>
            <label className="input-label">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Get Started
            </button>
          </form>

          <p className="text-sm text-center text-slate-400 mt-6">
            Already have an account?{" "}
            <Link to="/" className="font-semibold text-primary hover:text-violet-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
