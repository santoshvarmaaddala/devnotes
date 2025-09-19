import * as vscode from "vscode";
import { DevNotesProvider } from "../tree/devNotesProvider";
import { v4 as uuidv4 } from "uuid"; // for unique ids

export function registerAddFeature(provider: DevNotesProvider) {
  return vscode.commands.registerCommand("devnotes.addFeature", async () => {
    const title = await vscode.window.showInputBox({
      prompt: "Enter feature title",
      placeHolder: "e.g. User Authentication",
    });

    if (title) {
      provider.addFeature({
        id: uuidv4(),
        title,
        status: "pending",
        notes: [],
      });
    }
  });
}
