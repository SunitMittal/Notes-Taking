const Note = require("../models/notes");

exports.addNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title)
      return res.status(400).json({ success: false, msg: "Title is required" });
    if (!content)
      return res
        .status(400)
        .json({ success: false, msg: "Content is required" });

    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    res.status(200).json({
      success: true,
      note,
      msg: "Note added successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error:err.message });
  }
};

exports.viewAllNote = async (req, res) => {
  try {
    const { user } = req.user;

    const notes = await Note.find({ userId: user._id }).sort({
      isPinned: -1,
    });

    res.status(200).json({
      success: true,
      notes,
      msg: "All Notes retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error:err.message });
  }
};

exports.editNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags)
      return res
        .status(400)
        .json({ success: false, msg: "No changes provided" });

    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note)
      return res.status(404).json({ success: false, msg: "Note not found" });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    res.status(200).json({
      success: true,
      note,
      msg: "Note updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error:err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { user } = req.user;

    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note)
      return res.status(404).json({ success: false, msg: "Note not found" });

    await Note.deleteOne({ _id: noteId, userId: user._id });

    res.status(200).json({
      success: true,
      note,
      msg: "Note deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error:err.message });
  }
};

exports.updatePinnedNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note)
      return res.status(404).json({ success: false, msg: "Note not found" });

    note.isPinned = isPinned;

    await note.save();

    res.status(200).json({
      success: true,
      note,
      msg: "Note updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error:err.message });
  }
};

exports.searchNote = async (req, res) => {
  try {
    const { user } = req.user;
    const { query } = req.query;

    if (!query)
      return res
        .status(400)
        .json({ success: false, msg: "Search query is required" });

    const matchingNote = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    res.status(200).json({
      success: true,
      notes: matchingNote,
      msg: "Notes matching the search query retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error:err.message });
  }
};
