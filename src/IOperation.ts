import { ICodeSegment } from "./ICodeSegment";
import { IOperationArgument } from "./IOperationArgument";
export interface IOperation extends ICodeSegment {
  operationCode: string;
  operationArguments: ICodeSegment[];
  getArguments(): IOperationArgument[];
}
