import { Element } from "./Element";
import { ElementType } from "./ElementType";
import { Operation } from "./Operation";
import { Range } from "vscode";
export class Label extends Element {
  public readonly type = ElementType.Label;
  constructor(public definition: Operation, public name: string, public readonly range: Range) {
    super();
  }
}