import * as vscode from "vscode";
import { NoteItem } from "./noteItem";

export class DevNotesProvider implements vscode.TreeDataProvider<NoteItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<NoteItem | undefined>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private items: NoteItem[] = [];

  constructor(private context: vscode.ExtensionContext) {}

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: NoteItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: NoteItem): Thenable<NoteItem[]> {
    if (!element) {
      return Promise.resolve(this.items);
    }
    return Promise.resolve(element.children);
  }

  addFeature(label: string) {
    this.items.push(new NoteItem(label));
    this.refresh();
  }

  addNoteToFeature(feature: NoteItem, note: string) {
    feature.children.push(new NoteItem(note));
    this.refresh();
  }

  markCompleted(item: NoteItem) {
    item.completed = true;
    this.refresh();
  }
}
