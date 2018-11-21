import * as vscode from "vscode";
import { ICodeSegment } from "./ICodeSegment";
import { ILabelDefinition } from "./ILabelDefinition";
export class JumpLabelDefinition implements ILabelDefinition {
  constructor(
    public name: string,
    public definition: ICodeSegment,
    public range: vscode.Range,
    public text: string
  ) {}
}
