import * as vscode from "vscode";
import { DevNotesProvider } from "../tree/devNotesProvider";
import { getRandomUUID } from "../utils/idGenerator"; 

export function registerAddFeature(provider: DevNotesProvider) {
  return vscode.commands.registerCommand("devnotes.addFeature", async () => {
    const title = await vscode.window.showInputBox({
      prompt: "Enter feature title",
      placeHolder: "e.g. User Authentication",
    });

    if (title) {
      provider.addFeature({
        id: getRandomUUID(),
        title,
        type: "feature",
        status: "todo",
        priority: "medium",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: [],
      });
    }
  });
}
