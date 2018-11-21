"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OperatorArgument_1 = require("./OperatorArgument");
class JumpLabel {
    constructor(definition, name) {
        this.definition = definition;
        this.name = name;
    }
    canBeAppliedTo(operator, argPos) {
        return operator.operatorArgs[argPos] === OperatorArgument_1.OperatorArgument.Address;
    }
}
exports.JumpLabel = JumpLabel;
//# sourceMappingURL=JumpLabel.js.map