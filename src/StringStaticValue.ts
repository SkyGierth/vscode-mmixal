import * as vscode from "vscode";
import { IStaticValue } from "./IStaticValue";
import { OperationArgumentType } from "./OperationArgumentType";
export class StringStaticValue implements IStaticValue {
  public type: OperationArgumentType = OperationArgumentType.String;
  constructor(
    public range: vscode.Range,
    public text: string,
    public value: string,
    public stringValue: string
  ) {}
}
