import { ICodeSegment } from "./ICodeSegment";
import { OperationArgumentType } from "./OperationArgumentType";
export interface IOperationArgument extends ICodeSegment {
  type: OperationArgumentType;
  value: string;
}
