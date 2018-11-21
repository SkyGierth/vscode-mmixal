import * as vscode from "vscode";
import { ICodeSegment } from "./ICodeSegment";
import { IStaticValue } from "./IStaticValue";
import { IOperation } from "./IOperation";
import { IOperationArgument } from "./IOperationArgument";
import { Register } from "./Register";
export class SetOperation implements IOperation {
  public operationArguments: ICodeSegment[];
  public getArguments(): IOperationArgument[] {
    return [this.register, this.value];
  }
  constructor(
    public range: vscode.Range,
    public text: string,
    public operationCode: string,
    public register: Register,
    public value: IStaticValue
  ) {
    this.operationArguments = [this.register, this.value];
  }
}
