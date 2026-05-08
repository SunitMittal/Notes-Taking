import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-72 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 transition-all duration-200">
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-primary transition-colors flex-shrink-0"
        onClick={handleSearch}
      />
      <input
        type="text"
        placeholder="Search notes..."
        value={value}
        onChange={onChange}
        className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
      />
      {value && (
        <IoMdClose
          onClick={onClearSearch}
          className="text-lg text-slate-400 cursor-pointer hover:text-slate-700 transition-colors flex-shrink-0"
        />
      )}
    </div>
  );
};

export default SearchBar;
