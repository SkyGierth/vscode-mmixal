import { ElementType } from "./ElementType";
import { Primitive } from "./Primitive";
import { Range } from "vscode";
export class SpecialRegister extends Primitive<string> {
  public readonly type = ElementType.SpecialRegister;
  constructor(public value: string, public readonly range: Range) {
    super();
  }
}