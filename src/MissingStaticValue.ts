import * as vscode from "vscode";
import { IStaticValue } from "./IStaticValue";
import { OperationArgumentType } from "./OperationArgumentType";
export class MissingStaticValue implements IStaticValue {
  type: OperationArgumentType = OperationArgumentType.Missing;
  value: string = "MISSING";
  range: vscode.Range;
  text: string = "MISSING";
  constructor(range: vscode.Range) {
    this.range = range;
  }
}
