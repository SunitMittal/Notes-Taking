import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addNewTag();
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mt-2">
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1.5 text-xs font-medium text-violet-700 bg-violet-100 px-3 py-1 rounded-full"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-violet-900 transition-colors"
              >
                <MdClose className="text-sm" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          placeholder="Add a tag..."
          className="flex-1 text-sm bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary hover:bg-violet-700 transition-colors shadow-sm shadow-violet-200"
          onClick={addNewTag}
        >
          <MdAdd className="text-xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
