"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenType_1 = require("./TokenType");
class TokenStream {
    constructor(_inputStream) {
        this._inputStream = _inputStream;
    }
    next() {
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
                type: TokenType_1.TokenType.Punctuation,
                value: this._inputStream.next()
            };
        }
        if (char.match(/^[\d#]$/)) {
        }
        throw this._inputStream.error(`Cannot handle character "${char}"`);
    }
    readNumeric() {
        let number = "";
        number += this._inputStream.next();
        number += this.readWhile(c => !!c.match(/^\d$/));
        let numeric;
        if (number.startsWith("#")) {
            numeric = parseInt("0x" + number.substring(1));
        }
        else {
            numeric = parseInt(number);
        }
        if (numeric === NaN) {
            throw new this._inputStream.error(`"${number}" is not a valid number`);
        }
        return {
            type: TokenType_1.TokenType.Number,
            value: numeric
        };
    }
    readString() {
        const string = this.readWhile(c => c !== '"');
        return {
            type: TokenType_1.TokenType.String,
            value: string
        };
    }
    peek() {
        throw new Error("Method not implemented.");
    }
    eof() {
        throw new Error("Method not implemented.");
    }
    error(message) {
        throw new Error("Method not implemented.");
    }
    readWhile(predicate) {
        let result = "";
        while (predicate(this._inputStream.peek())) {
            result += this._inputStream.next();
        }
        return result;
    }
    static isWhiteSpace(char) {
        return [" ", "\t", "\r", "\n"].indexOf(char) > -1;
    }
}
exports.TokenStream = TokenStream;
//# sourceMappingURL=TokenStream.js.map