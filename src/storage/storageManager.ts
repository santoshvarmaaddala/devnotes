import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { DevNotesData } from "../models/feature";

export class StorageManager {
  private devNotesFile: string | null = null;

  constructor() {
    this.initializeWorkspace();

    // Watch for workspace changes
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
      this.initializeWorkspace();
    });
  }

  private initializeWorkspace() {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) {
      vscode.window.showWarningMessage("No workspace folder open. DevNotes storage will be disabled.");
      this.devNotesFile = null;
      return;
    }

    const workspacePath = workspaceFolders[0].uri.fsPath;
    const vscodeDir = path.join(workspacePath, ".vscode");
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir);
    }

    this.devNotesFile = path.join(vscodeDir, "devnotes.json");
  }

  loadData(): DevNotesData {
    if (!this.devNotesFile) {
      vscode.window.showWarningMessage("DevNotes cannot load data. No workspace folder is open.");
      return { features: [] };
    }

    if (fs.existsSync(this.devNotesFile)) {
      const raw = fs.readFileSync(this.devNotesFile, "utf-8");
      try {
        return JSON.parse(raw);
      } catch (err) {
        vscode.window.showWarningMessage("DevNotes data corrupted. Resetting file.");
        const defaultData: DevNotesData = { features: [] };
        this.saveData(defaultData);
        return defaultData;
      }
    }

    const defaultData: DevNotesData = { features: [] };
    this.saveData(defaultData);
    return defaultData;
  }

  saveData(data: DevNotesData) {
    if (!this.devNotesFile) {
      vscode.window.showWarningMessage("DevNotes cannot save data. No workspace folder is open.");
      return;
    }

    fs.writeFileSync(this.devNotesFile, JSON.stringify(data, null, 2), "utf-8");
  }
}
