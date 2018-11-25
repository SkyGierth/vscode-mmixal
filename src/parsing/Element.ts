import { ElementType } from "./ElementType";
import { Range } from "vscode";
export abstract class Element {
  public abstract range: Range;
  public abstract type: ElementType;
}