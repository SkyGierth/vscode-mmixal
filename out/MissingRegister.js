"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Register_1 = require("./Register");
class MissingRegister extends Register_1.Register {
    constructor(range) {
        super(range, "MISSING", "MISSING", -1);
    }
}
exports.MissingRegister = MissingRegister;
//# sourceMappingURL=MissingRegister.js.map