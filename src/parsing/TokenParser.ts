import { TokenStream } from "./TokenStream";
import { Token } from "./Token";
import { TokenType } from "./TokenType";
import { Program } from "./Program";
import { Operation } from "./Operation";
import { Primitive } from "./Primitive";
import { LabelReference } from "./LabelReference";
import { Number } from "./Number";
import { String } from "./String";
import { Register } from "./Register";
import { Label } from "./Label";
import { SpecialRegister } from "./SpecialRegister";
import { MissingPrimitive } from "./MissingPrimitive";
import { MissingNumber } from "./MissingNumber";
import { Range, Position } from "vscode";
import { MissingRegister } from "../MissingRegister";
import { SetOperation } from "./operations/SetOperation";
import { IsOperation } from "./operations/IsOperation";
import { CmpOperation } from "./operations/CmpOperation";
import { DivOperation } from "./operations/DivOperation";

export class TokenParser {
  constructor(private _tokenStream: TokenStream) {}

  public parse(): Program {
    const operations: (Operation | Label)[] = [];

    let token: Token | null;
    while ((token = this._tokenStream.peek()) !== null) {
      if (token.type === TokenType.Operation) {
        operations.push(this.parseOperation());
      } else if (token.type === TokenType.Label) {
        operations.push(this.parseLabel());
      } else {
        throw new Error(
          `Could not parse ${token.type} at ${token.range.start.line}:${
            token.range.start.character
          } to ${token.range.end.line}:${token.range.end.character}`
        );
      }
    }

    return new Program(
      operations,
      new Range(new Position(0, 0), this._tokenStream.position)
    );
  }

  private parseLabel(): Label {
    const token = this._tokenStream.next();
    const operation = this.parseOperation();

    const range = new Range(token!.range.start, operation.range.end);
    return new Label(operation, token!.value, range);
  }

  private parseOperation(): Operation {
    const token = this._tokenStream.next();
    const args = this.parseOperationArguments();

    const endPosition =
      args.length > 0 ? args[args.length - 1].range.end : token!.range.end;
    const range = new Range(token!.range.start, endPosition);

    if (token!.value === "IS") {
      let value = new MissingPrimitive(new Range(endPosition, endPosition));

      if (args.length === 1) {
        value = args[0];
      }

      return new IsOperation(value, range);
    } else if (token!.value === "SET") {
      let register: Register | LabelReference = new MissingRegister(
        new Range(range.end, range.end)
      );
      let value: Primitive = new MissingPrimitive(
        new Range(range.end, range.end)
      );
      if (args.length === 2) {
        const primRegister = args[0];
        const primValue = args[1];

        if (
          primRegister instanceof Register ||
          primRegister instanceof LabelReference
        ) {
          register = primRegister;
          value = primValue;
        }
      }
      return new SetOperation(register, value, range);
    } else if (["CMP", "DIV"].indexOf(token!.value) > -1) {
      let register: Register | LabelReference = new MissingRegister(
        new Range(range.end, range.end)
      );

      let valueA: Number | LabelReference = new MissingNumber(
        new Range(range.end, range.end)
      );
      let valueB: Number | LabelReference = new MissingNumber(
        new Range(range.end, range.end)
      );

      if (args.length === 3) {
        const param1 = args[0];
        const param2 = args[1];
        const param3 = args[2];

        if (param1 instanceof Register || param1 instanceof LabelReference) {
          register = param1;
        }
        if (param2 instanceof Number || param1 instanceof LabelReference) {
          valueA = param2;
        }
        if (param3 instanceof Number || param1 instanceof LabelReference) {
          valueB = param3;
        }
      }

      if (token!.value === "CMP") {
        return new CmpOperation(register, valueA, valueB, range);
      } else if (token!.value === "DIV") {
        return new DivOperation(register, valueA, valueB, range);
      }
    }

    return new Operation(token!.value, args, range);
  }

  private parseOperationArgument(): Primitive<any> {
    const token = this._tokenStream.next();
    if (token === null) {
      throw this._tokenStream.error("Token cannot be null");
    }

    switch (token.type) {
      case TokenType.Keyword:
        return new SpecialRegister(token.value, token.range);
      case TokenType.Number:
        return new Number(parseInt(token.value), token.range);
      case TokenType.Label:
        return new LabelReference(token.value, token.range);
      case TokenType.Register:
        return new Register(parseInt(token.value), token.range);
      case TokenType.String:
        return new String(token.value, token.range);
    }

    return new MissingPrimitive(token.range);
  }

  private parseOperationArguments(): Primitive[] {
    const args: Primitive[] = [];

    let token: Token | null;
    while (
      (token = this._tokenStream.peek()) !== null &&
      this.isOperationArgumentTokenType(token)
    ) {
      let arg = this.parseOperationArgument();
      args.push(arg);

      token = this._tokenStream.peek();

      if (token === null || token.type !== TokenType.Punctuation) {
        break;
      }

      this._tokenStream.next();
    }

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
