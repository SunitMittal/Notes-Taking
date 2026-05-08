import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Toast from "../components/ToastMessage/Toast";
import EmptyCard from "../components/EmptyCard";
import AddNotesImg from "../assets/Add-Note.jpeg";
import NoDataImg from "../assets/No-Data-Found.jpg";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({ isShown: true, message, type });
  };

  const handleCloseToast = () => {
    setShowToastMsg({ isShown: false, message: "" });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/profile");
      if (response.data && response.data.user) setUserInfo(response.data.user);
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/view");
      if (response.data && response.data.notes) setAllNotes(response.data.notes);
    } catch (err) {
      console.log("An unexpected error occurred. Please try again.", err);
    }
  };

  const deleteNotes = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (err) {
      console.log("An unexpected error occurred. Please try again.", err);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search", { params: { query } });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/update-pinned/" + noteId, {
        isPinned: !noteData.isPinned,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto px-6 pb-24">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-5 mt-8">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                colorIndex={index}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNotes(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            message={
              isSearch
                ? "Oops! No note found matching your search."
                : "Start creating your first note! Click the '+' button to jot down your thoughts, ideas, and reminders."
            }
          />
        )}
      </div>

      <button
        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-violet-700 fixed right-8 bottom-8 shadow-xl shadow-violet-300 transition-all duration-200 hover:scale-110"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-3xl text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(109, 40, 217, 0.08)",
            backdropFilter: "blur(4px)",
          },
        }}
        contentLabel=""
        className="w-[480px] max-h-[88vh] bg-white rounded-3xl mx-auto mt-12 p-7 overflow-y-auto shadow-2xl shadow-violet-100 border border-violet-100 outline-none"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
