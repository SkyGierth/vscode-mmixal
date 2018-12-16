import { ElementType } from "./ElementType";
import { Primitive } from "./Primitive";
import { Range } from "vscode";
export class Number extends Primitive<number> {
  public type = ElementType.Number;
  constructor(public value: number, public readonly range: Range) {
    super();
  }
}
