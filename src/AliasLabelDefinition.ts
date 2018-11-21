import * as vscode from "vscode";
import { ICodeSegment } from "./ICodeSegment";
import { ILabelDefinition } from "./ILabelDefinition";
export class AliasLabelDefinition implements ILabelDefinition {
  constructor(
    public range: vscode.Range,
    public name: string,
    public definition: ICodeSegment,
    public text: string,
    public aliasFor: string
  ) {}
}
