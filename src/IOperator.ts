import { OperatorArgument } from "./OperatorArgument";
export interface IOperator {
  name: string;
  operatorArgs: OperatorArgument[];
  description?: string;
}
