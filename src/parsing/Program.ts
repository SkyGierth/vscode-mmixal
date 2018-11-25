import { Element } from "./Element";
import { ElementType } from "./ElementType";
import { Range } from "vscode";
export class Program extends Element {
  public readonly type = ElementType.Program;
  constructor(public operations: Element[], public readonly range: Range) {
    super();
  }
}