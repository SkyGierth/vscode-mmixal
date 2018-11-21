import { IOperator } from "./IOperator";
import { OperatorArgument } from "./OperatorArgument";
export class Operator implements IOperator {
  constructor(
    public name: string,
    public operatorArgs: OperatorArgument[],
    public description?: string | undefined
  ) {}
}
