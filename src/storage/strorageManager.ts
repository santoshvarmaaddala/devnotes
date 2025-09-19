import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { DevNotesData } from "../models/feature";

export class StorageManager {
    private devNotesFile: string;

    constructor() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length == 0) {
            throw new Error("No workspace folder open.");
        }

        const workspacePath = workspaceFolders[0].uri.fsPath;
        const vscodeDir = path.join(workspacePath, ".vscode");
        if (!fs.existsSync(vscodeDir)) {
            fs.mkdirSync(vscodeDir);
        }

        this.devNotesFile = path.join(vscodeDir, "devnotes.json");
    }

    loadData(): DevNotesData {
        if (fs.existsSync(this.devNotesFile)) {
            const raw = fs.readFileSync(this.devNotesFile, "utf-8");
            return JSON.parse(raw);
        }
        const defaultData: DevNotesData = { features: [] };
        this.saveData(defaultData);
        return defaultData;
    }

    saveData(data: DevNotesData) {
        fs.writeFileSync(this.devNotesFile, JSON.stringify(data, null, 2));
    }
}