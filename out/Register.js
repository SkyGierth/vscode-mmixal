"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OperationArgumentType_1 = require("./OperationArgumentType");
class Register {
    constructor(range, text, value, register) {
        this.range = range;
        this.text = text;
        this.value = value;
        this.register = register;
        this.type = OperationArgumentType_1.OperationArgumentType.Register;
    }
}
exports.Register = Register;
//# sourceMappingURL=Register.js.map