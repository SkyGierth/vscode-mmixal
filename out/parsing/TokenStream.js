"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenType_1 = require("./TokenType");
const vscode_1 = require("vscode");
class TokenStream {
    constructor(_inputStream) {
        this._inputStream = _inputStream;
        this._currentToken = null;
        this._position = _inputStream.position;
    }
    get position() {
        return this._position;
    }
    range(startPosition) {
        return new vscode_1.Range(startPosition, this._inputStream.position);
    }
    readNext() {
        this.readWhile(TokenStream.isWhiteSpace);
        if (this._inputStream.eof()) {
            return null;
        }
        const char = this._inputStream.peek();
        if (char === "%") {
            this.readWhile(x => x !== "\n");
            return this.readNext();
        }
        this._position = this._inputStream.position;
        if (char === '"') {
            return this.readString();
        }
        if (char === ",") {
            const startPosition = this.position;
            return {
                type: TokenType_1.TokenType.Punctuation,
                value: this._inputStream.next(),
                range: this.range(startPosition)
            };
        }
        if (char === "$") {
            return this.readRegister();
        }
        if (char === "#") {
            return this.readHex();
        }
        if (char.match(/^\d$/)) {
            return this.readNumeric();
        }
        return this.readIdentifier();
    }
    readIdentifier() {
        const startPosition = this.position;
        const identifier = this.readWhile(c => [" ", "\t", "\n", "\r", ","].indexOf(c) === -1);
        if (TokenStream.isOperation(identifier)) {
            return {
                type: TokenType_1.TokenType.Operation,
                value: identifier,
                range: this.range(startPosition)
            };
        }
        if (TokenStream.isKeyWord(identifier)) {
            return {
                type: TokenType_1.TokenType.Keyword,
                value: identifier,
                range: this.range(startPosition)
            };
        }
        return {
            type: TokenType_1.TokenType.Label,
            value: identifier,
            range: this.range(startPosition)
        };
    }
    static isOperation(identifier) {
        const operations = [
            "2ADDU",
            "4ADDU",
            "8ADDU",
            "16ADDU",
            "ADD",
            "ADDU",
            "AND",
            "ANDNH",
            "ANDNL",
            "ANDNMH",
            "ANDNML",
            "BDIF",
            "BEV",
            "BN",
            "BNN",
            "BNP",
            "BNZ",
            "BOD",
            "BP",
            "BSPEC",
            "BYTE",
            "BZ",
            "CMP",
            "CMPU",
            "CSEV",
            "CSN",
            "CSNN",
            "CSNP",
            "CSNZ",
            "CSOD",
            "CSP",
            "CSWAP",
            "CSZ",
            "DIV",
            "DIVU",
            "ESPEC",
            "EXPR",
            "FADD",
            "FCMP",
            "FCMPE",
            "FDIV",
            "FEQL",
            "FEQLE",
            "FIX",
            "FIXU",
            "FLOT",
            "FLOTU",
            "FMUL",
            "FREM",
            "FSQRT",
            "FSUB",
            "FUN",
            "FUNE",
            "GET",
            "GETA",
            "GO",
            "GREG",
            "I_BIT",
            "INCH",
            "INCL",
            "INCMH",
            "INCML",
            "IS",
            "JMP",
            "LDA",
            "LDB",
            "LDBU",
            "LDHT",
            "LDO",
            "LDOU",
            "LDSF",
            "LDT",
            "LDTU",
            "LDUNC",
            "LDVTS",
            "LDW",
            "LDWU",
            "LOC",
            "LOCAL",
            "MOR",
            "MUL",
            "MULU",
            "MUX",
            "MXOR",
            "NAND",
            "NEG",
            "NEGU",
            "NNIX",
            "NOR",
            "NXOR",
            "O_BIT",
            "OCTA",
            "ODIF",
            "OR",
            "ORH",
            "ORL",
            "ORMH",
            "ORML",
            "ORN",
            "PBEV",
            "PBN",
            "PBNN",
            "PBNP",
            "PBNZ",
            "PBOD",
            "PBP",
            "PBZ",
            "POP",
            "PREFIX",
            "PREGO",
            "PRELD",
            "PREST",
            "PUSHGO",
            "PUSHJ",
            "PUT",
            "RESUME",
            "SAVE",
            "SET",
            "SETH",
            "SETL",
            "SETMH",
            "SETML",
            "SFLOT",
            "SFLOTU",
            "SL",
            "SLU",
            "SR",
            "SRU",
            "STB",
            "STBU",
            "STCO",
            "STHT",
            "STO",
            "STOU",
            "STSF",
            "STT",
            "STTU",
            "STUNC",
            "STW",
            "STWU",
            "SUB",
            "SUBU",
            "SWYM",
            "SYNC",
            "SYNCD",
            "TDIF",
            "TETRA",
            "TRAP",
            "TRIP",
            "UNSAVE",
            "WDIF",
            "WYDEXOR",
            "ZSEV",
            "ZSN",
            "ZSNN",
            "ZSNP",
            "ZSNZ",
            "ZSOD",
            "ZSP",
            "ZSZ"
        ];
        return operations.indexOf(identifier) > -1;
    }
    static isKeyWord(identifier) {
        const keyWords = [
            "rA",
            "rB",
            "rC",
            "rD",
            "rE",
            "rF",
            "rG",
            "rH",
            "rI",
            "rJ",
            "rK",
            "rL",
            "rM",
            "rN",
            "rO",
            "rP",
            "rQ",
            "rR",
            "rS",
            "rT",
            "rU",
            "rV",
            "rW",
            "rX",
            "rY",
            "rZ",
            "rBB",
            "rTT",
            "rWW",
            "rXX",
            "rYY",
            "rZZ",
            "Text_Segment",
            "Data_Segment",
            "Pool_Segment",
            "Stack_Segment",
            "StdErr",
            "StdIn",
            "StdOut",
            "Fopen",
            "Fclose",
            "Fread",
            "Fwrite",
            "Fgets",
            "Fputs",
            "Fgetws",
            "Fputws",
            "Ftell",
            "Fseek",
            "TextRead",
            "TextWrite",
            "BinaryRead",
            "BinaryWrite",
            "BinaryReadWrite",
            "Halt",
            "@"
        ];
        return keyWords.indexOf(identifier) > -1;
    }
    readHex() {
        const startPosition = this.position;
        let prefix = this._inputStream.next();
        if (prefix !== "#") {
            throw this._inputStream.error(`Expected "#" but got "${prefix}"`);
        }
        let hex = "";
        while ([" ", "\t", "\n", "\r", ","].indexOf(this._inputStream.peek()) === -1) {
            const char = this._inputStream.next();
            if (!char.match(/^[a-fA-F\d]$/)) {
                throw this._inputStream.error(`Unexpected character ${char}`);
            }
            hex += char;
        }
        return {
            type: TokenType_1.TokenType.Number,
            value: parseInt("0x" + hex),
            range: this.range(startPosition)
        };
    }
    readRegister() {
        const startPosition = this.position;
        let prefix = this._inputStream.next();
        if (prefix !== "$") {
            throw this._inputStream.error(`Expected "$" but got "${prefix}"`);
        }
        let register = "";
        while ([" ", "\t", "\n", "\r", ","].indexOf(this._inputStream.peek()) === -1) {
            const char = this._inputStream.next();
            if (!char.match(/^\d$/)) {
                throw this._inputStream.error(`Unexpected character ${char}`);
            }
            register += char;
        }
        return {
            type: TokenType_1.TokenType.Register,
            value: parseInt(register),
            range: this.range(startPosition)
        };
    }
    readNumeric() {
        const startPosition = this.position;
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
            throw this._inputStream.error(`"${number}" is not a valid number`);
        }
        return {
            type: TokenType_1.TokenType.Number,
            value: numeric,
            range: this.range(startPosition)
        };
    }
    readString() {
        const startPosition = this.position;
        let escaped = false, str = "";
        this._inputStream.next();
        while (!this._inputStream.eof()) {
            const ch = this._inputStream.next();
            if (escaped) {
                str += ch;
                escaped = false;
            }
            else if (ch === "\\") {
                escaped = true;
            }
            else if (ch === '"') {
                break;
            }
            else {
                str += ch;
            }
        }
        return {
            type: TokenType_1.TokenType.String,
            value: str,
            range: this.range(startPosition)
        };
    }
    peek() {
        if (!this._currentToken) {
            this._currentToken = this.readNext();
        }
        return this._currentToken;
    }
    next() {
        const token = this._currentToken;
        this._currentToken = null;
        return token || this.readNext();
    }
    eof() {
        return this.peek() === null;
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