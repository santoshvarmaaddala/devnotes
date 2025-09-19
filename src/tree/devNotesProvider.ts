import * as vscode from "vscode";
import { DevNotesData } from "../models/feature";
import { StorageManager } from "../storage/storageManager";
import { FeatureItem, NoteItem } from "./noteItem";

export class DevNotesProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  private data: DevNotesData;
  private storage: StorageManager;

  private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> =
    new vscode.EventEmitter<vscode.TreeItem | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> =
    this._onDidChangeTreeData.event;

  constructor() {
    this.storage = new StorageManager();
    this.data = this.storage.loadData();
  }

  refresh(): void {
    this.data = this.storage.loadData();
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: any): Thenable<any[]> {
     if (!element) {
    return Promise.resolve(
      this.data.features.map(
        (f) => new FeatureItem(f.id, f.title, f.status)
      )
    );
  } else {
      // Children: notes
      return Promise.resolve(
        (this.data.features.find((f) => f.title === element.label)?.notes || [])
          .map((n) => {
            const noteItem = new vscode.TreeItem(n.content, vscode.TreeItemCollapsibleState.None); // ✅ always string
            return noteItem;
          })
      );
    }
  }

  // API methods used by commands:
  public addFeature(feature: any) {
    this.data.features.push(feature);
    this.storage.saveData(this.data);
    this._onDidChangeTreeData.fire();
  }

  public addNote(featureId: string, note: any) {
    const feature = this.data.features.find((f) => f.id === featureId);
    if (feature) {
      feature.notes.push(note);
      feature.updatedAt = new Date().toISOString();
      this.storage.saveData(this.data);
      this._onDidChangeTreeData.fire();
    }
  }

  public markCompleted(featureId: string) {
    const feature = this.data.features.find((f) => f.id === featureId);
    if (feature) {
      feature.status = "completed";
      feature.updatedAt = new Date().toISOString();
      this.storage.saveData(this.data);
      this._onDidChangeTreeData.fire();
    }
  }

  // helper to provide data to other modules if needed
  public getData(): DevNotesData {
    return this.data;
  }
}
