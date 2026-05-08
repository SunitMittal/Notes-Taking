import React, { useState } from "react";
import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { MdOutlineNotes } from "react-icons/md";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery) onSearchNote(searchQuery);
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white border-b border-slate-100 flex items-center justify-between px-6 py-3 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-violet-200">
          <MdOutlineNotes className="text-white text-xl" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Notely</h2>
      </div>

      {onSearchNote && (
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
