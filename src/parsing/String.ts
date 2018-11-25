import { ElementType } from "./ElementType";
import { Primitive } from "./Primitive";
import { Range } from "vscode";
export class String extends Primitive<string> {
  public readonly type = ElementType.String;
  constructor(public value: string, public readonly range: Range) {
    super();
  }
}