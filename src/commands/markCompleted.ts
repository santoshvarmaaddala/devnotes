import * as vscode from "vscode";
import { DevNotesProvider } from "../tree/devNotesProvider";

export function registerMarkCompleted(provider: DevNotesProvider) {
  return vscode.commands.registerCommand("devnotes.markCompleted", async (item) => {
    if (!item) {
      vscode.window.showErrorMessage("Select a feature to mark as completed.");
      return;
    }

    provider.markCompleted(item.id);
    vscode.window.showInformationMessage(`Feature "${item.label}" marked as completed!`);
  });
}
