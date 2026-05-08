import React from "react";
import moment from "moment";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const CARD_COLORS = [
  {
    border: "border-violet-200",
    dot: "bg-violet-400",
    tagBg: "bg-violet-100",
    tagText: "text-violet-700",
    pinActive: "text-violet-500",
  },
  {
    border: "border-rose-200",
    dot: "bg-rose-400",
    tagBg: "bg-rose-100",
    tagText: "text-rose-700",
    pinActive: "text-rose-500",
  },
  {
    border: "border-sky-200",
    dot: "bg-sky-400",
    tagBg: "bg-sky-100",
    tagText: "text-sky-700",
    pinActive: "text-sky-500",
  },
  {
    border: "border-emerald-200",
    dot: "bg-emerald-400",
    tagBg: "bg-emerald-100",
    tagText: "text-emerald-700",
    pinActive: "text-emerald-500",
  },
  {
    border: "border-amber-200",
    dot: "bg-amber-400",
    tagBg: "bg-amber-100",
    tagText: "text-amber-700",
    pinActive: "text-amber-500",
  },
];

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote, colorIndex = 0 }) => {
  const colors = CARD_COLORS[colorIndex % CARD_COLORS.length];

  return (
    <div
      className={`bg-white rounded-2xl border-2 ${colors.border} p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer group`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-start gap-2.5">
          <div className={`w-2 h-2 rounded-full ${colors.dot} flex-shrink-0 mt-1.5`} />
          <div>
            <h6 className="text-sm font-semibold text-slate-800 leading-snug">{title}</h6>
            <span className="text-xs text-slate-400 mt-0.5 block">{moment(date).format("Do MMM YYYY")}</span>
          </div>
        </div>
        <MdOutlinePushPin
          className={`text-xl flex-shrink-0 cursor-pointer transition-colors duration-200 ${
            isPinned ? colors.pinActive : "text-slate-200 hover:text-slate-400"
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mb-4">{content?.slice(0, 120)}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((item, i) => (
            <span
              key={i}
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.tagBg} ${colors.tagText}`}
            >
              #{item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-emerald-50 text-slate-300 hover:text-emerald-500 transition-all"
            onClick={onEdit}
          >
            <MdCreate className="text-base" />
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all"
            onClick={onDelete}
          >
            <MdDelete className="text-base" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
