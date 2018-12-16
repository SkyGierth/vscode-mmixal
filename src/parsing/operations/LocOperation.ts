import { OperationWith1Arg } from "../Operation";
import { LabelReference } from "../LabelReference";
import { Number } from "../Number";
import { Range } from "vscode";

export class LocOperation extends OperationWith1Arg<LabelReference | Number> {
  constructor(arg: LabelReference | Number, range: Range) {
    super("LOC", arg, range);
  }
  getDescription(): string {
    const arg = this.arg.type === "Missing" ? "a" : this.arg.value;

    return `Locates the cursor to a position in the memory. The following commands are saved in the memory starting at ${arg}.`;
  }
}
