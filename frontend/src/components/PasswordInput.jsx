import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 mb-4 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 transition-all duration-200">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 outline-none text-slate-700 placeholder:text-slate-400"
      />
      <button type="button" onClick={() => setIsShowPassword(!isShowPassword)}>
        {isShowPassword ? (
          <FaRegEye size={18} className="text-primary" />
        ) : (
          <FaRegEyeSlash size={18} className="text-slate-300 hover:text-slate-500 transition-colors" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
