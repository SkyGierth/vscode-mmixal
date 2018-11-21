import { IOperator } from "./IOperator";
import { Operator } from "./Operator";
import { OperatorArgument } from "./OperatorArgument";

export const operators: IOperator[] = [
  new Operator(
    "LDA",
    [OperatorArgument.Register, OperatorArgument.Address],
    "Loads an address to a register"
  ),
  new Operator("SET", [OperatorArgument.Register, OperatorArgument.Value])
];
