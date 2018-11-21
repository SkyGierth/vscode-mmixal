import * as vscode from "vscode";
import { IStaticValue } from "./IStaticValue";
import { OperationArgumentType } from "./OperationArgumentType";
export class NumericStaticValue implements IStaticValue {
  public type: OperationArgumentType =
    OperationArgumentType.Decimal | OperationArgumentType.Hex;
  constructor(
    public range: vscode.Range,
    public text: string,
    public value: string,
    public numericValue: number
  ) {}
}
