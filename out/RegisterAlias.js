"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OperationArgumentType_1 = require("./OperationArgumentType");
const Register_1 = require("./Register");
class RegisterAlias extends Register_1.Register {
    constructor(range, text, value, aliasDefinition) {
        super(range, text, value, parseInt(aliasDefinition.aliasFor));
        this.range = range;
        this.text = text;
        this.value = value;
        this.aliasDefinition = aliasDefinition;
        this.type = OperationArgumentType_1.OperationArgumentType.Register;
    }
}
exports.RegisterAlias = RegisterAlias;
//# sourceMappingURL=RegisterAlias.js.map