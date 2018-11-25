"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Register_1 = require("./parsing/Register");
class MissingRegister extends Register_1.Register {
    constructor(range) {
        super(-1, range);
    }
}
exports.MissingRegister = MissingRegister;
//# sourceMappingURL=MissingRegister.js.map