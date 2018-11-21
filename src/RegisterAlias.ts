import * as vscode from "vscode";
import { OperationArgumentType } from "./OperationArgumentType";
import { AliasLabelDefinition } from "./AliasLabelDefinition";
import { Register } from "./Register";
import { IAlias } from "./IAlias";
export class RegisterAlias extends Register implements IAlias {
  public type: OperationArgumentType = OperationArgumentType.Register;
  constructor(
    public range: vscode.Range,
    public text: string,
    public value: string,
    public aliasDefinition: AliasLabelDefinition
  ) {
    super(range, text, value, parseInt(aliasDefinition.aliasFor));
  }
}
