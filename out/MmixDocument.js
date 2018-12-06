"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Label_1 = require("./parsing/Label");
const Operation_1 = require("./parsing/Operation");
const IsOperation_1 = require("./parsing/operations/IsOperation");
class MmixDocument {
    constructor(_program) {
        this._program = _program;
    }
    getLabelDefinition(labelReference) {
        return this._program.operations.find(x => x instanceof Label_1.Label && x.name === labelReference.value);
    }
    getElementAt(position) {
        let currentElement = this._program.operations.find(o => o.range.contains(position));
        if (currentElement instanceof Label_1.Label &&
            currentElement.definition.range.contains(position)) {
            currentElement = currentElement.definition;
        }
        if (currentElement instanceof Operation_1.Operation) {
            currentElement =
                currentElement.operationArguments.find(x => x.range.contains(position)) || currentElement;
        }
        return currentElement || null;
    }
    getMatchingLabels(position) {
        const currentElement = this._program.operations.find(o => o.range.contains(position));
        if ((currentElement && currentElement instanceof Operation_1.Operation) ||
            currentElement instanceof Label_1.Label) {
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
            return labels.filter(x => x.definition instanceof IsOperation_1.IsOperation &&
                operation.isMatchingArgument(x.definition.arg, currentArgument, labels));
        }
        return [];
    }
}
exports.MmixDocument = MmixDocument;
//# sourceMappingURL=MmixDocument.js.map