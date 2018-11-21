"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IsOperation {
    constructor(range, text, value) {
        this.range = range;
        this.text = text;
        this.value = value;
        this.operationCode = "IS";
        this.operationArguments = [this.value];
    }
    getArguments() {
        return [this.value];
    }
}
exports.IsOperation = IsOperation;
//# sourceMappingURL=IsOperation.js.map