import * as vscode from "vscode";
import { DevNotesProvider } from "./tree/devNotesProvider";
import { registerAddFeature } from "./commands/addFeature";
import { registerAddNote } from "./commands/addNote";
import { registerMarkCompleted } from "./commands/markCompleted";

export function activate(context: vscode.ExtensionContext) {
  const devNotesProvider = new DevNotesProvider();

  vscode.window.registerTreeDataProvider("devnotesView", devNotesProvider);

  // Register commands
  context.subscriptions.push(registerAddFeature(devNotesProvider));
  context.subscriptions.push(registerAddNote(devNotesProvider));
  context.subscriptions.push(registerMarkCompleted(devNotesProvider));

  vscode.window.showInformationMessage("DevNotes activated!");
}

export function deactivate() {}
