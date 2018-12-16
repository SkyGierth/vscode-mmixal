import { Operation, OperationWith1Arg } from "../Operation";
import { Primitive } from "../Primitive";
import { Label } from "../Label";
import { Range } from "vscode";
export class IsOperation extends OperationWith1Arg<Primitive> {
  constructor(arg: Primitive, range: Range) {
    super("IS", arg, range);
  }
  isMatchingArgument(element: Primitive, position: number): boolean {
    if (position === 0) {
      return !(element instanceof Operation || element instanceof Label);
    }
    return false;
  }

  getDescription() {
    return "Sets an alias for a label";
  }
}
