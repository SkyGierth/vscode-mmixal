import { ElementType } from "./ElementType";
import { Primitive } from "./Primitive";
import { Range } from "vscode";
export class MissingPrimitive extends Primitive<string> {
  public readonly type: ElementType = ElementType.Missing;
  public readonly value: string = "";
  constructor(public readonly range: Range) {
    super();
  }
}