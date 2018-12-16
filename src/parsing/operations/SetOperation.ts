import { OperationWith2Args } from "../Operation";
import { Primitive } from "../Primitive";
import { LabelReference } from "../LabelReference";
import { Register } from "../Register";
import { Label } from "../Label";
import { Range } from "vscode";
export class SetOperation extends OperationWith2Args<
  Register | LabelReference,
  Primitive
> {
  constructor(
    private register: Register | LabelReference,
    private value: Primitive,
    range: Range
  ) {
    super("SET", register, value, range);
  }

  getDescription(): string {
    let value = this.value.type === "Missing" ? "a value" : this.value.value;
    let register = "a register";

    if (this.register instanceof Register) {
      register = "$" + this.register.value;
    } else {
      register = this.register.value;
    }

    return `Stores ${value} in ${register}.`;
  }

  isMatchingArgument(
    element: Primitive,
    position: number,
    labelDefinitions: Label[] = []
  ): boolean {
    if (position === 0) {
      if (element instanceof Register) {
        return true;
      }
      if (element instanceof LabelReference) {
        const labelDefinition = labelDefinitions.find(
          x => x.name === element.value
        );
        if (labelDefinition && labelDefinition.definition instanceof Register) {
          return true;
        }
      }
    }
    return false;
  }
}
