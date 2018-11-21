import { IOperationArgument } from "./IOperationArgument";
import { AliasLabelDefinition } from "./AliasLabelDefinition";
export interface IAlias extends IOperationArgument {
  aliasDefinition: AliasLabelDefinition;
}
