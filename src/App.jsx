import { useReducer, useState } from "react";
import "./App.css";
import AddNewNote from "./AddNewNote";
import NoteList from "./NoteList";
import NoteHeader from "./NoteHeader";
function App() {
  const [sortBy, setSortBy] = useState("latest");

  return (
    <div>
      <NoteHeader sortBy={sortBy} onSort={(e) => setSortBy(e.target.value)} />
      <div className="note-app">
        <AddNewNote />
        <NoteList sortBy={sortBy} />
      </div>
    </div>
  );
}

export default App;
