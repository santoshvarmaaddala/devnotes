import * as vscode from "vscode";
import { DevNotesProvider } from "../tree/devNotesProvider";
import { NoteItem } from "../tree/noteItem";

export function registerMarkCompleted(provider: DevNotesProvider) {
  return vscode.commands.registerCommand("devnotes.markCompleted", (item: NoteItem) => {
    provider.markCompleted(item);
  });
}
