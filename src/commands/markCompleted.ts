import * as vscode from "vscode";
import { DevNotesProvider } from "../tree/devNotesProvider";
import { FeatureItem } from "../tree/noteItem";

export function registerMarkCompleted(provider: DevNotesProvider) {
  return vscode.commands.registerCommand("devnotes.markCompleted", async (item?: FeatureItem) => {
    let featureId: string | undefined;
    let featureLabel = "";

    if (!item) {
      const data = provider.getData();
      if (!data.features.length) {
        vscode.window.showInformationMessage("No features to mark completed.");
        return;
      }
      const pick = await vscode.window.showQuickPick(
        data.features.map((f) => ({ label: f.title, id: f.id })),
        { placeHolder: "Select a feature to mark completed" }
      );
      if (!pick) return;
      featureId = pick.id;
      featureLabel = pick.label;
    } else {
      featureId = item.id;
      if (typeof item.label === "string") {
        featureLabel = item.label;
      } else if (item.label) {
        featureLabel = item.label.label;
      }
    }

    if (featureId) {
      provider.markCompleted(featureId);
      vscode.window.showInformationMessage(`Feature "${featureLabel}" marked as completed!`);
    }
  });
}
