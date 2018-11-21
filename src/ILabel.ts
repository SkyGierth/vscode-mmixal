import { IOperator } from "./IOperator";
import * as vscode from "vscode";
export interface ILabel {
  definition: vscode.Position;
  name: string;
  canBeAppliedTo(operator: IOperator, argPos: number): boolean;
}
