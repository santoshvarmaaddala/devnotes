import * as vscode from "vscode";
import { DevNotesProvider } from "../tree/devNotesProvider";

export function registerAddFeature(provider: DevNotesProvider) {
  return vscode.commands.registerCommand("devnotes.addFeature", async () => {
    const name = await vscode.window.showInputBox({ prompt: "Enter feature name" });
    if (name) {
      provider.addFeature(name);
    }
  });
}
