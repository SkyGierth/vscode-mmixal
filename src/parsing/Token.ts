import { TokenType } from "./TokenType";
import { Range } from "vscode";

export interface Token<T = any> {
  type: TokenType;
  value: T;
  range: Range
}
