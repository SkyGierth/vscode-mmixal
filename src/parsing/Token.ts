import { TokenType } from "./TokenType";

export interface Token<T = any> {
  type: TokenType;
  value: T;
}
