import * as vscode from "vscode";
import { DevNotesProvider } from "../tree/devNotesProvider";

export function registerAddNote(provider: DevNotesProvider) {
  return vscode.commands.registerCommand("devnotes.addNote", async (item) => {
    if (!item) {
      vscode.window.showErrorMessage("Select a feature to add a note.");
      return;
    }

    const noteText = await vscode.window.showInputBox({
      prompt: "Enter note text",
      placeHolder: "e.g. Need to handle error states",
    });

    if (noteText) {
      provider.addNote(item.id, { content: noteText });
    }
  });
}
