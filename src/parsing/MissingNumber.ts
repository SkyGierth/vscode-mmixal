import { ElementType } from "./ElementType";
import { Range } from "vscode";
import { Number } from "./Number";
export class MissingNumber extends Number {
  public readonly type: ElementType = ElementType.Missing;
  public readonly value: number = -1;
  constructor(public readonly range: Range) {
    super(-1, range);
  }
}
