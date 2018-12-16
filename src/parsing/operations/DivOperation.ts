import { OperationWith3Args } from "../Operation";
import { Primitive } from "../Primitive";
import { LabelReference } from "../LabelReference";
import { Register } from "../Register";
import { Label } from "../Label";
import { Range } from "vscode";
import { Number } from "../Number";
import { isRegister } from "./isRegister";
export class DivOperation extends OperationWith3Args<
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
    super("DIV", registerTo, a, b, range);
  }

  getDescription(): string {
    let a = this.a.type === "Missing" ? "a" : this.a.value;
    let b = this.b.type === "Missing" ? "b" : this.b.value;
    let register = "a register";

    if (this.registerTo instanceof Register) {
      register = "$" + this.registerTo.value;
    } else {
      register = this.registerTo.value;
    }

    return `Stores the result of ${a} / ${b} in ${register}.`;
  }

  isMatchingArgument(
    element: Primitive,
    position: number,
    labelDefinitions: Label[] = []
  ): boolean {
    if (position === 0) {
      return isRegister(element, labelDefinitions);
    }
    return false;
  }
}
