"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OperationArgumentType_1 = require("./OperationArgumentType");
class StringStaticValue {
    constructor(range, text, value, stringValue) {
        this.range = range;
        this.text = text;
        this.value = value;
        this.stringValue = stringValue;
        this.type = OperationArgumentType_1.OperationArgumentType.String;
    }
}
exports.StringStaticValue = StringStaticValue;
//# sourceMappingURL=StringStaticValue.js.map