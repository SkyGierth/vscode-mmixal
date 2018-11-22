export interface IStream<T = any> {
  /**
   * Gets the next character from the stream and moves the cursor
   * @returns the next character from the stream
   */
  next(): T | null;
  /**
   * Gets the next character from the stream without moving the cursor
   * @returns the next character from the stream
   */
  peek(): T | null;

  eof(): boolean;

  /**
   * Throws an error with a specified message and the information about the current position
   */
  error(message: string): void;
}
