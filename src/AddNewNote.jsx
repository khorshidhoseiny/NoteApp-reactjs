import React, { useState } from "react";
import { useNoteDispatch } from "./context/NoteContext";

function AddNewNote() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useNoteDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      id: new Date().getTime(),
      title,
      desc,
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    };
    console.log(newNote);
    dispatch({ type: "add", payload: newNote });
    setTitle("");
    setDesc("");
  };
  return (
    <div className="add-new-note">
      <div>
        <form action="" className="note-form" onSubmit={handleSubmit}>
          <h3>Add new Form</h3>
          <input
            type="text"
            className="text-field"
            placeholder="note title ..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            type="text"
            value={desc}
            className="text-field"
            placeholder="note description ..."
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className="btn btn--primary">Add new Note</button>
        </form>
      </div>
    </div>
  );
}

export default AddNewNote;
