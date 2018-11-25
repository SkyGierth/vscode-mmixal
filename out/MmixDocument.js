"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Label_1 = require("./parsing/Label");
const Operation_1 = require("./parsing/Operation");
const TokenParser_1 = require("./parsing/TokenParser");
class MmixDocument {
    constructor(_program) {
        this._program = _program;
    }
    getMatchingLabels(position) {
        const currentElement = this._program.operations.find(o => o.range.contains(position));
        if (currentElement && currentElement instanceof Operation_1.Operation || currentElement instanceof Label_1.Label) {
            let operation;
            if (currentElement instanceof Label_1.Label) {
                operation = currentElement.definition;
            }
            else {
                operation = currentElement;
            }
            const labels = this._program.operations.filter(x => x instanceof Label_1.Label && x.range.end.compareTo(position) < 0);
            let currentArgument = operation.operationArguments.findIndex(x => x.range.contains(position));
            currentArgument = currentArgument < 0 ? 0 : currentArgument;
            return labels.filter(x => x.definition instanceof TokenParser_1.IsOperation && operation.isMatchingArgument(x.definition.arg, currentArgument, labels));
        }
        return [];
    }
}
exports.MmixDocument = MmixDocument;
//# sourceMappingURL=MmixDocument.js.map