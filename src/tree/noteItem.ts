import * as vscode from "vscode";

/**
 * FeatureItem represents the top-level node (a feature/bug/idea).
 * It carries the feature id so commands can reference it.
 */
export class FeatureItem extends vscode.TreeItem {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly status: string
  ) {
    super(title, vscode.TreeItemCollapsibleState.Collapsed);

    this.contextValue = "feature";

    // Show status in description
    this.description = status;

    // Show icon depending on status
    if (status === "completed") {
      this.iconPath = new vscode.ThemeIcon("check"); // ✅ built-in check icon
    } else {
      this.iconPath = new vscode.ThemeIcon("circle-outline"); // ○ not completed
    }
  }
}

/**
 * NoteItem represents a single note under a feature.
 * It carries parent featureId so we can navigate back if needed.
 */
export class NoteItem extends vscode.TreeItem {
  constructor(
    public readonly featureId: string,
    public readonly noteId: string,
    public readonly text: string,
    public readonly completed: boolean = false
  ) {
    super(text, vscode.TreeItemCollapsibleState.None);
    this.contextValue = completed ? "noteCompleted" : "note";
    this.iconPath = new vscode.ThemeIcon(completed ? "check" : "circle-large-outline");
  }
}
