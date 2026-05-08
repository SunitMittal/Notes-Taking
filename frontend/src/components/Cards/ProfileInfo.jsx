import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-bold shadow-md shadow-violet-200 flex-shrink-0">
          {getInitials(userInfo.fullName)}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 leading-tight">{userInfo.fullName}</p>
          <button
            className="text-xs text-slate-400 hover:text-primary transition-colors"
            onClick={onLogout}
          >
            Sign out
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
