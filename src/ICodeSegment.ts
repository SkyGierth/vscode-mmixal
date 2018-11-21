import * as vscode from "vscode";
export interface ICodeSegment {
  range: vscode.Range;
  text: string;
}
