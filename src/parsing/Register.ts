import { ElementType } from "./ElementType";
import { Primitive } from "./Primitive";
import { Range } from "vscode";
export class Register extends Primitive<number> {
  public readonly type = ElementType.Register;
  constructor(public value: number, public readonly range: Range) {
    super();
  }
}