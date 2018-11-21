import * as vscode from "vscode";
import { ICodeSegment } from "./ICodeSegment";
import { IOperation } from "./IOperation";
import { IOperationArgument } from "./IOperationArgument";
export class IsOperation implements IOperation {
  public operationArguments: ICodeSegment[];
  public operationCode: string = "IS";
  public getArguments(): IOperationArgument[] {
    return [this.value];
  }
  constructor(
    public range: vscode.Range,
    public text: string,
    public value: IOperationArgument
  ) {
    this.operationArguments = [this.value];
  }
}
