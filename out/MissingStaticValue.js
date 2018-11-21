"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OperationArgumentType_1 = require("./OperationArgumentType");
class MissingStaticValue {
    constructor(range) {
        this.type = OperationArgumentType_1.OperationArgumentType.Missing;
        this.value = "MISSING";
        this.text = "MISSING";
        this.range = range;
    }
}
exports.MissingStaticValue = MissingStaticValue;
//# sourceMappingURL=MissingStaticValue.js.map