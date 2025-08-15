import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import AddNewNote from "../AddNewNote";
import App from "../App";
import NoteProvider from "../context/NoteContext";

function addNotes(notes, title, desc) {
  const btn = screen.getByRole("button", { name: /add/i });
  notes.forEach((element) => {
    fireEvent.change(title, { target: { value: element.title } });
    fireEvent.change(desc, { target: { value: element.description } });
  });
  fireEvent.click(btn);
}

test("NoteApp test #1:should input be empty after submit", () => {
  render(
    <NoteProvider>
      <App />
    </NoteProvider>
  );
  const inputTitle = screen.getByPlaceholderText("note title ...");
  const inputDesc = screen.getByPlaceholderText("note description ...");
  addNotes(
    [
      { title: "this is note title", description: "this is note description" },
      {
        title: "this is note title #1",
        description: "this is note description #1",
      },
      {
        title: "this is note title #2",
        description: "this is note description #2",
      },
      {
        title: "this is note title #3",
        description: "this is note description #3",
      },
    ],
    inputTitle,
    inputDesc
  );

  expect(inputTitle.value).toBe("");
  expect(inputDesc.value).toBe("");
});
