import { IOperator } from "./IOperator";
import { OperatorArgument } from "./OperatorArgument";
import * as vscode from "vscode";
import { ILabel } from "./ILabel";
export class JumpLabel implements ILabel {
  constructor(public definition: vscode.Position, public name: string) {}
  public canBeAppliedTo(operator: IOperator, argPos: number): boolean {
    return operator.operatorArgs[argPos] === OperatorArgument.Address;
  }
}
