"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OperationArgumentType_1 = require("./OperationArgumentType");
class NumericStaticValue {
    constructor(range, text, value, numericValue) {
        this.range = range;
        this.text = text;
        this.value = value;
        this.numericValue = numericValue;
        this.type = OperationArgumentType_1.OperationArgumentType.Decimal | OperationArgumentType_1.OperationArgumentType.Hex;
    }
}
exports.NumericStaticValue = NumericStaticValue;
//# sourceMappingURL=NumericStaticValue.js.map