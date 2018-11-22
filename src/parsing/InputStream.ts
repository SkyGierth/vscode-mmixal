import { IStream } from "./IStream";

export class InputStream implements IStream<string> {
  private _position: number = 0;
  private _line: number = 0;
  private _column: number = 0;

  constructor(private _input: string) {}

  /**
   * Gets the next character from the stream and moves the cursor
   * @returns the next character from the stream
   */
  public next(): string {
    const char = this._input[this._position];
    if (char === "\n") {
      this._line++;
      this._column = 0;
    } else {
      this._column++;
    }

    return char;
  }

  /**
   * Gets the next character from the stream without moving the cursor
   * @returns the next character from the stream
   */
  public peek(): string {
    return this._input[this._position];
  }

  public eof(): boolean {
    return this.peek() === "";
  }

  /**
   * Returns an error with a specified message and the information about the current position
   */
  public error(message: string): Error {
    return new Error(`${message} (at line ${this._line}:${this._column})`);
  }
}
