import { ElementType } from "./ElementType";
import { Primitive } from "./Primitive";
import { Range } from "vscode";
export class LabelReference extends Primitive<string> {
  public readonly type = ElementType.LabelReference;
  constructor(public value: string, public readonly range: Range) {
    super();
  }
}