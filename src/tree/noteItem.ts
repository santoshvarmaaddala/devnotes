import * as vscode from "vscode";

export class NoteItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public completed: boolean = false,
    public readonly children: NoteItem[] = []
  ) {
    super(label, children.length ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);

    this.contextValue = completed ? "completed" : "pending";
    this.iconPath = new vscode.ThemeIcon(completed ? "check" : "circle-large-outline");
  }
}
