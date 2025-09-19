import * as vscode from "vscode";
import { DevNotesProvider } from "../tree/devNotesProvider";
import { FeatureItem } from "../tree/noteItem";
import { v4 as uuidv4 } from "uuid";

export function registerAddNote(provider: DevNotesProvider) {
  return vscode.commands.registerCommand("devnotes.addNote", async (item?: FeatureItem) => {
    // If command called from palette (no item), ask user to pick a feature
    let featureId: string | undefined;
    if (!item) {
      const data = provider.getData();
      if (!data.features.length) {
        vscode.window.showInformationMessage("No features yet. Create a feature first.");
        return;
      }
      const pick = await vscode.window.showQuickPick(
        data.features.map((f) => ({ label: f.title, id: f.id })),
        { placeHolder: "Select a feature to add note to" }
      );
      if (!pick) return;
      featureId = pick.id;
    } else {
      featureId = item.id;
    }

    const noteText = await vscode.window.showInputBox({
      prompt: "Enter note text",
      placeHolder: "e.g. Need to handle error states",
    });

    if (!noteText) return;

    provider.addNote(featureId, {
      id: uuidv4(),
      content: noteText,
      createdAt: new Date().toISOString(),
      status: "open"
    });
  });
}
