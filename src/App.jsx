import { useState } from "react";
import "./App.css";
import NoteHeader from "./NoteHeader";
import NoteApp from "./NoteApp";
import AppProvider from "./providers/AppProvider";
function App() {
  const [sortBy, setSortBy] = useState("latest");

  return (
    <AppProvider>
      <NoteHeader sortBy={sortBy} onSort={(e) => setSortBy(e.target.value)} />
      <NoteApp sortBy={sortBy} />
    </AppProvider>
  );
}

export default App;
