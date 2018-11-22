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
        if (char === "$") {
            return this.readRegister();
        }
        if (char.match(/^\d$/)) {
            return this.readNum();
        }
        throw this._inputStream.error(`Cannot handle character "${char}"`);
    }
    readIdentifier() {
        const identifier = this.readWhile(c => [" ", "\t", "\n", "\r", ","].indexOf(c) > -1);
        return {
            type: TokenType_1.TokenType.Identifier,
            value: identifier
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
            "Halt"
        ];
        return keyWords.indexOf(identifier) > -1;
    }
    readNum() {
        const num = this.readWhile(c => [" ", "\t", "\n", "\r", ","].indexOf(c) > -1);
        return {
            type: TokenType_1.TokenType.Number,
            value: parseInt(num)
        };
    }
    readHex() {
        let prefix = this._inputStream.next();
        if (prefix !== "#") {
            throw this._inputStream.error(`Expected "#" but got "${prefix}"`);
        }
        let hex = "";
        let char;
        do {
            char = this._inputStream.next();
            if (!char.match(/^\d$/)) {
                throw this._inputStream.error(`Unexpected character ${char}`);
            }
            hex += char;
        } while ([" ", "\t", "\n", "\r", ","].indexOf(char) > 0);
        return {
            type: TokenType_1.TokenType.Number,
            value: parseInt("0x" + hex)
        };
    }
    readRegister() {
        let prefix = this._inputStream.next();
        if (prefix !== "$") {
            throw this._inputStream.error(`Expected "$" but got "${prefix}"`);
        }
        let register = "";
        let char;
        do {
            char = this._inputStream.next();
            if (!char.match(/^\d$/)) {
                throw this._inputStream.error(`Unexpected character ${char}`);
            }
            register += char;
        } while ([" ", "\t", "\n", "\r", ","].indexOf(char) > 0);
        return {
            type: TokenType_1.TokenType.Register,
            value: parseInt(register)
        };
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
            throw this._inputStream.error(`"${number}" is not a valid number`);
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