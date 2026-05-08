import React, { useState } from "react";
import TagInput from "../components/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add", { title, content, tags });
      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (err) {
      if (err.response?.data?.message) setError(err.response.data.message);
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/update/" + noteId, { title, content, tags });
      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (err) {
      if (err.response?.data?.message) setError(err.response.data.message);
    }
  };

  const handleAddNote = () => {
    if (!title) { setError("Please enter the title"); return; }
    if (!content) { setError("Please enter the content"); return; }
    setError("");
    if (type === "edit") editNote();
    else addNewNote();
  };

  return (
    <div className="relative">
      <button
        className="w-8 h-8 rounded-xl flex items-center justify-center absolute -top-2 -right-2 hover:bg-slate-100 transition-colors"
        onClick={onClose}
      >
        <MdClose className="text-lg text-slate-400" />
      </button>

      <h3 className="text-lg font-bold text-slate-800 mb-6">
        {type === "edit" ? "Edit Note" : "New Note"}
      </h3>

      <div className="flex flex-col gap-1 mb-5">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-xl font-semibold text-slate-800 outline-none border-b-2 border-slate-200 pb-2 focus:border-violet-400 transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-normal"
          placeholder="Note title..."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-1 mb-5">
        <label className="input-label">Content</label>
        <textarea
          className="text-sm text-slate-600 outline-none bg-slate-50 border border-slate-200 p-3 rounded-xl focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all resize-none placeholder:text-slate-300"
          placeholder="Write your note here..."
          rows={8}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mb-5">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && (
        <p className="text-red-600 text-xs bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 mb-4">
          {error}
        </p>
      )}

      <button className="btn-primary font-semibold" onClick={handleAddNote}>
        {type === "edit" ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
};

export default AddEditNotes;
