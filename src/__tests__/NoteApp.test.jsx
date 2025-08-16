import { fireEvent, render, screen } from "../test-utils";
import { expect, test } from "vitest";
import App from "../App";
import NoteProvider from "../context/NoteContext";
import NoteApp from "../NoteApp";

function addNotes(notes) {
  const inputTitle = screen.getByPlaceholderText("note title ...");
  const inputDesc = screen.getByPlaceholderText("note description ...");
  const btn = screen.getByRole("button", { name: /add/i });
  notes.forEach((element) => {
    fireEvent.change(inputTitle, { target: { value: element.title } });
    fireEvent.change(inputDesc, { target: { value: element.description } });
    fireEvent.click(btn);
  });
}
test("NoteApp test #1:should input be empty after submit", () => {
  render(
    <NoteProvider>
      <NoteApp sortBy={"latest"} />
    </NoteProvider>
  );
  const inputTitle = screen.getByPlaceholderText("note title ...");
  const inputDesc = screen.getByPlaceholderText("note description ...");
  addNotes([
    { title: "this is note title", description: "this is note description" },
  ]);

  expect(inputTitle.value).toBe("");
  expect(inputDesc.value).toBe("");
});
test("NoteApp test #2:list rendered in notelist", () => {
  render(
    <NoteProvider>
      <NoteApp sortBy={"latest"} />
    </NoteProvider>
  );

  addNotes([
    { title: "this is note title", description: "this is note description" },
    { title: "this is note title", description: "this is note description" },
    { title: "this is note title", description: "this is note description" },
  ]);
  const divElements = screen.getAllByText(/this is note title/i);

  expect(divElements.length).toBe(3);
});

test("NoteApp test #3:should not have active classes when initialy render", () => {
  render(
    <NoteProvider>
      <App />
    </NoteProvider>
  );
  addNotes([
    { title: "this is note title", description: "this is note description" },
  ]);
  const noteItem = screen.getByTestId("note-item");
  expect(noteItem).not.toHaveClass("completed");
});

test("NoteApp test #3:should have active classe when item clicked", () => {
  render(
    <NoteProvider>
      <App />
    </NoteProvider>
  );
  addNotes([
    { title: "this is note title", description: "this is note description" },
  ]);
  const noteItem = screen.getByTestId("note-item");
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(noteItem).toHaveClass("completed");
});
