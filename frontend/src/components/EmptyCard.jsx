import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-24 px-4">
      <div className="w-52 h-52 rounded-3xl overflow-hidden shadow-lg shadow-violet-100 border-2 border-violet-100 mb-6">
        <img src={imgSrc} alt="No Notes" className="w-full h-full object-cover" />
      </div>
      <p className="max-w-xs text-sm text-slate-400 text-center leading-7 font-medium">{message}</p>
    </div>
  );
};

export default EmptyCard;
