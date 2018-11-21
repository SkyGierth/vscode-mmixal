"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SetOperation {
    constructor(range, text, operationCode, register, value) {
        this.range = range;
        this.text = text;
        this.operationCode = operationCode;
        this.register = register;
        this.value = value;
        this.operationArguments = [this.register, this.value];
    }
    getArguments() {
        return [this.register, this.value];
    }
}
exports.SetOperation = SetOperation;
//# sourceMappingURL=SetOperation.js.map