import { createContext, useContext, useReducer } from "react";
const NoteContext = createContext(null);
const NoteDispacher = createContext(null);

const NoteReducer = (state, { type, payload }) => {
  switch (type) {
    case "add": {
      return [...state, payload];
    }
    case "delete": {
      return state.filter((note) => note.id !== payload);
    }
    case "completed": {
      return state.map((note) =>
        note.id === payload ? { ...note, completed: !note.completed } : note
      );
    }
    default:
      throw new Error("unknown action" + type);
  }
};

export default function NoteProvider({ children }) {
  const [notes, dispatch] = useReducer(NoteReducer, []);
  return (
    <NoteContext.Provider value={notes}>
      <NoteDispacher.Provider value={dispatch}>
        {children}
      </NoteDispacher.Provider>
    </NoteContext.Provider>
  );
}

// Custom Hook For Consume Context
export const useNote = () => {
  return useContext(NoteContext);
};
export const useNoteDispatch = () => {
  return useContext(NoteDispacher);
};
