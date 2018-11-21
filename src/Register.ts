import * as vscode from "vscode";
import { IStaticValue } from "./IStaticValue";
import { OperationArgumentType } from "./OperationArgumentType";
export class Register implements IStaticValue {
  public type: OperationArgumentType = OperationArgumentType.Register;
  constructor(
    public range: vscode.Range,
    public text: string,
    public value: string,
    public register: number
  ) {}
}
