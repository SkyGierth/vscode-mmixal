import { IOperator } from "./IOperator";
import { ILabel } from "./ILabel";
import * as vscode from "vscode";
export class AliasLabel implements ILabel {
  public canBeAppliedTo(operator: IOperator, argPos: number): boolean {
    return true;
  }
  constructor(
    public definition: vscode.Position,
    public name: string,
    public aliasFor: string
  ) {}
}
