import { IStream } from "./IStream";
import { Token } from "./Token";
import { InputStream } from "./InputStream";
import { TokenType } from "./TokenType";

export class TokenStream implements IStream<Token> {
  constructor(private _inputStream: InputStream) {}

  public next(): Token<any> | null {
    this.readWhile(TokenStream.isWhiteSpace);

    if (this._inputStream.eof()) {
      return null;
    }

    const char = this._inputStream.peek();
    if (char === "%") {
      this.readWhile(x => x !== "\n");
      return this.next();
    }

    if (char === '"') {
      return this.readString();
    }

    if (char === ",") {
      return {
        type: TokenType.Punctuation,
        value: this._inputStream.next()
      };
    }

    if (char.match(/^[\d#]$/)) {
    }

    throw this._inputStream.error(`Cannot handle character "${char}"`);
  }

  private readNumeric(): Token {
    let number = "";

    number += this._inputStream.next();

    number += this.readWhile(c => !!c.match(/^\d$/));

    let numeric;
    if (number.startsWith("#")) {
      numeric = parseInt("0x" + number.substring(1));
    } else {
      numeric = parseInt(number);
    }

    if (numeric === NaN) {
      throw new this._inputStream.error(`"${number}" is not a valid number`);
    }

    return {
      type: TokenType.Number,
      value: numeric
    };
  }

  private readString(): Token {
    const string = this.readWhile(c => c !== '"');

    return {
      type: TokenType.String,
      value: string
    };
  }

  public peek(): Token<any> {
    throw new Error("Method not implemented.");
  }
  public eof(): boolean {
    throw new Error("Method not implemented.");
  }
  public error(message: string): void {
    throw new Error("Method not implemented.");
  }

  private readWhile(predicate: (char: string) => boolean): string {
    let result = "";

    while (predicate(this._inputStream.peek())) {
      result += this._inputStream.next();
    }

    return result;
  }

  private static isWhiteSpace(char: string): boolean {
    return [" ", "\t", "\r", "\n"].indexOf(char) > -1;
  }
}
