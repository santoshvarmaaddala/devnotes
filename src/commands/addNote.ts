import * as vscode from "vscode";
import { DevNotesProvider } from "../tree/devNotesProvider";
import { NoteItem } from "../tree/noteItem";

export function registerAddNote(provider: DevNotesProvider) {
  return vscode.commands.registerCommand("devnotes.addNote", async (item: NoteItem) => {
    const note = await vscode.window.showInputBox({ prompt: "Enter note text" });
    if (note) {
      provider.addNoteToFeature(item, note);
    }
  });
}
