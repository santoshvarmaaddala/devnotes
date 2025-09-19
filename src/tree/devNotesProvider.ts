import * as vscode from "vscode";
import {DevNotesData } from "../models/feature";
import { StorageManager } from "../storage/strorageManager";

export class DevNotesProvider implements vscode.TreeDataProvider<any> {

  private data: DevNotesData;
  private storage: StorageManager;

  private _onDidChangeTreeData: vscode.EventEmitter<void> = 
    new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData: vscode.Event<void> = this._onDidChangeTreeData.event;

  constructor () {
    this.storage = new StorageManager();
    this.data = this.storage.loadData();
  }

  getTreeItem(element: any): vscode.TreeItem {
      return element;
  }

  getChildren(element?: any): Thenable<any[]> {
    if (!element) {
      // Top level: features
      return Promise.resolve(
        this.data.features.map(
          (f) =>
            new vscode.TreeItem(
              f.title,
              vscode.TreeItemCollapsibleState.Collapsed
            )
        )
      );
    } else {
      // Children: notes
      return Promise.resolve(
        (this.data.features.find((f) => f.title === element.label)?.notes ||
          []).map((n) => new vscode.TreeItem(n.content))
      );
    }
  }

  public addFeature(feature: any) {
    this.data.features.push(feature);
    this.storage.saveData(this.data);
    this._onDidChangeTreeData.fire();
  }

  public addNote(featureId: string, note: any) {
    const feature = this.data.features.find((f) => f.id === featureId);
    if (feature) {
      feature.notes.push(note);
      this.storage.saveData(this.data);
      this._onDidChangeTreeData.fire();
    }
  }

  public markCompleted(featureId: string) {
    const feature = this.data.features.find((f) => f.id === featureId);
    if (feature) {
      feature.status = "completed";
      this.storage.saveData(this.data);
      this._onDidChangeTreeData.fire();
    }
  }
}