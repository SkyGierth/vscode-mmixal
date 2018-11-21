"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Operator_1 = require("./Operator");
const OperatorArgument_1 = require("./OperatorArgument");
exports.operators = [
    new Operator_1.Operator("LDA", [OperatorArgument_1.OperatorArgument.Register, OperatorArgument_1.OperatorArgument.Address], "Loads an address to a register"),
    new Operator_1.Operator("SET", [OperatorArgument_1.OperatorArgument.Register, OperatorArgument_1.OperatorArgument.Value])
];
//# sourceMappingURL=operators.js.map