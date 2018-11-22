import { TokenStream } from "./TokenStream";
import { Token } from "./Token";
import { TokenType } from "./TokenType";

export class TokenParser {
  constructor(private _tokenStream: TokenStream) {}

  public parse(): Program {
    const operations: (Operation | Label)[] = [];

    let token: Token | null;
    while ((token = this._tokenStream.peek()) !== null) {
      if (token.type === TokenType.Operation) {
        operations.push();
      }
    }

    return new Program(operations);
  }

  private parseOperation(): Operation {
    const token = this._tokenStream.next();
    return new Operation(token!.value, this.parseOperationArguments());
  }

  private parseOperationArgument(): Primitive {
    const token = this._tokenStream.next();
    switch (token!.type) {
      case TokenType.Keyword:
        return new SpecialRegister(token!.value);
    }
  }

  private parseOperationArguments(): Primitive[] {
    const args: Primitive[] = [];

    let token: Token = this._tokenStream.next();

    return args;
  }

  private isOperationArgumentTokenType(token: Token) {
    return (
      [
        TokenType.Keyword,
        TokenType.Label,
        TokenType.Number,
        TokenType.Register,
        TokenType.String
      ].indexOf(token.type) > -1
    );
  }
}

abstract class Element {
  public abstract type: ElementType;
}

class SpecialRegister extends Primitive<string> {
  public readonly type = ElementType.SpecialRegister;
  constructor(public value: string) {
    super();
  }
}

enum ElementType {
  Operation = "operation",
  Label = "label",
  String = "string",
  Number = "number",
  Register = "register",
  LabelReference = "labelReference",
  Program = "program",
  SpecialRegister = "specialRegister"
}

class Program extends Element {
  public readonly type = ElementType.Program;

  constructor(public operations: Element[]) {
    super();
  }
}

class Operation extends Element {
  public readonly type = ElementType.Operation;

  constructor(
    public operationCode: string,
    public operationArguments: Primitive[]
  ) {
    super();
  }
}

abstract class Primitive<T = string> extends Element {
  public abstract value: T;
}

class LabelReference extends Primitive<string> {
  public readonly type = ElementType.LabelReference;
  constructor(public value: string) {
    super();
  }
}

class Number extends Primitive<number> {
  public readonly type = ElementType.Number;
  constructor(public value: number) {
    super();
  }
}

class String extends Primitive<string> {
  public readonly type = ElementType.String;
  constructor(public value: string) {
    super();
  }
}

class Register extends Primitive<number> {
  public readonly type = ElementType.Register;

  constructor(public value: number) {
    super();
  }
}

class Label extends Element {
  public readonly type = ElementType.Label;
  constructor(public definition: Operation, public name: string) {
    super();
  }
}
