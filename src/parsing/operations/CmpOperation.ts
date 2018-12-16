import { OperationWith3Args } from "../Operation";
import { Primitive } from "../Primitive";
import { LabelReference } from "../LabelReference";
import { Register } from "../Register";
import { Label } from "../Label";
import { Range } from "vscode";
import { Number } from "../Number";
import { isRegister } from "./isRegister";
import { isNumber } from "./isNumber";
export class CmpOperation extends OperationWith3Args<
  Register | LabelReference,
  Number | LabelReference,
  Number | LabelReference
> {
  constructor(
    private registerTo: Register | LabelReference,
    private a: Number | LabelReference,
    private b: Number | LabelReference,
    range: Range
  ) {
    super("CMP", registerTo, a, b, range);
  }

  getDescription(): string {
    let a = this.a.type === "Missing" ? "a" : this.a.value;
    let b = this.b.type === "Missing" ? "b" : this.b.value;
    let register = "a register";

    if (this.registerTo.type !== "Missing") {
      if (this.registerTo instanceof Register) {
        register = "$" + this.registerTo.value;
      } else {
        register = this.registerTo.value;
      }
    }

    return `Compares ${a} and ${b}.\n
Sets ${register} = 0 if **${a} = ${b}**.\n
Sets ${register} = 1 if **${a} > ${b}**.\n
Sets ${register} = -1 if **${a} < ${b}**.`;
  }

  isMatchingArgument(
    element: Primitive,
    position: number,
    labelDefinitions: Label[] = []
  ): boolean {
    if (position === 0) {
      return isRegister(element, labelDefinitions);
    } else if (position === 1 || position === 2) {
      return (
        isNumber(element, labelDefinitions) ||
        isRegister(element, labelDefinitions)
      );
    }
    return false;
  }
}
