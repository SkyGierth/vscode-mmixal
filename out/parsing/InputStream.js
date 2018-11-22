"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InputStream {
    constructor(_input) {
        this._input = _input;
        this._position = 0;
        this._line = 0;
        this._column = 0;
    }
    /**
     * Gets the next character from the stream and moves the cursor
     * @returns the next character from the stream
     */
    next() {
        const char = this._input[this._position++];
        if (char === "\n") {
            this._line++;
            this._column = 0;
        }
        else {
            this._column++;
        }
        return char;
    }
    /**
     * Gets the next character from the stream without moving the cursor
     * @returns the next character from the stream
     */
    peek() {
        return this._input[this._position];
    }
    eof() {
        return this.peek() === undefined;
    }
    /**
     * Returns an error with a specified message and the information about the current position
     */
    error(message) {
        return new Error(`${message} (at line ${this._line}:${this._column})`);
    }
}
exports.InputStream = InputStream;
//# sourceMappingURL=InputStream.js.map