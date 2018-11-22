import { TokenStream } from "./TokenStream";

export class TokenParser {
  constructor(private _tokenStream: TokenStream) {}
}

interface Element {
  type: ElementType;
}

enum ElementType {
  Operation = "operation",
  Label = "label"
}

interface Operation extends Element {
  operationCode: string;
}

interface Number extends Element {
  value: number;
}

interface String extends Element {
  value: string;
}

interface Register extends Element {
  register: string;
}

interface Label {
  definition: Operation;
}
