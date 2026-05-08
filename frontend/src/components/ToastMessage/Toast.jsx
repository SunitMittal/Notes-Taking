import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border ${
          type === "delete"
            ? "bg-red-50 border-red-200 shadow-red-100"
            : "bg-emerald-50 border-emerald-200 shadow-emerald-100"
        }`}
      >
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0 ${
            type === "delete" ? "bg-red-100" : "bg-emerald-100"
          }`}
        >
          {type === "delete" ? (
            <MdDeleteOutline className="text-red-500 text-lg" />
          ) : (
            <LuCheck className="text-emerald-500 text-lg" />
          )}
        </div>
        <p
          className={`text-sm font-medium ${
            type === "delete" ? "text-red-700" : "text-emerald-700"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default Toast;
