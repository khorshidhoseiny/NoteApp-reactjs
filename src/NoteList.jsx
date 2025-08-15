import React, { useContext } from "react";
import { useNote, useNoteDispatch } from "./context/NoteContext";

function NoteList({ sortBy }) {
  const notes = useNote();
  const dispatch = useNoteDispatch();
  // console.log(notes, dispatch);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let sortedNote = notes;
  if (sortBy === "earliest")
    sortedNote = [...notes].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    ); // a -b  => a > b ? 1 : -1

  if (sortBy === "latest")
    sortedNote = [...notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ); // b -a  => a > b ? -1 : 1

  if (sortBy === "completed") {
    sortedNote = [...notes].sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );
  }

  if (sortedNote.length === 0) return <p>no Note added</p>;
  return (
    <div className="note-container">
      {sortedNote.map((note) => {
        return (
          <div
            key={note.id}
            className={`note-item ${note.completed ? "completed" : ""}`}
          >
            <div className="note-item__header">
              <div>
                <p className="title">{note.title}</p>
                <p className="desc">{note.desc}</p>
              </div>
              <div className="actions">
                <button
                  onClick={() => dispatch({ type: "delete", payload: note.id })}
                >
                  ❌
                </button>
                <input
                  type="checkbox"
                  name={note.id}
                  id={note.id}
                  value={note.id}
                  checked={note.completed}
                  onChange={() =>
                    dispatch({
                      type: "completed",
                      payload: note.id,
                    })
                  }
                />
              </div>
            </div>
            <p className="note-item__footer">
              {new Date(note.createdAt).toLocaleDateString("en-US", options)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default NoteList;
