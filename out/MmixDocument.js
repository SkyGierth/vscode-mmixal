"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("./operators");
const LabelFactory_1 = require("./LabelFactory");
const vscode = require("vscode");
class MmixDocument {
    constructor(textDocument) {
        this.textDocument = textDocument;
        const lines = this.textDocument.getText().split("\n");
        const lineMatches = lines
            .map((line, i) => ({
            line: i + 1,
            match: line.match(/^(\w+)\s+(\S+)\s*(\S*)/)
        }))
            .filter(({ match }) => match !== null);
        const lineData = lineMatches.map(({ line, match }) => ({
            name: match[1],
            def1: match[2],
            def2: match[3],
            line
        }));
        this._labels = lineData.map(labelData => LabelFactory_1.LabelFactory.createLabel(labelData, new vscode.Position(labelData.line, 0)));
    }
    getLine(position) {
        return this.textDocument.getText(new vscode.Range(position.line, 0, position.line + 1, 0));
    }
    getOperator(position) {
        const line = this.getLine(position);
        const operatorMatch = line.match(/^(?:[ \t]+|\w+[ \t]+)(\w+)/);
        if (operatorMatch) {
            const operatorName = operatorMatch[1];
            return operators_1.operators.find(op => op.name === operatorName) || null;
        }
        return null;
    }
    getOperatorArgPosition(position) {
        const line = this.getLine(position);
        const lineBegin = line.substring(0, position.character);
        return lineBegin.split(",").length - 1;
    }
    getMatchingLabels(arg1, arg2) {
        const labels = this.getLabels();
        if (arg1 instanceof vscode.Position) {
            const operator = this.getOperator(arg1);
            const operatorArgPosition = this.getOperatorArgPosition(arg1);
            if (operator === null) {
                return [];
            }
            return this.getMatchingLabels(operator, operatorArgPosition);
        }
        if (arg2 === undefined) {
            return [];
        }
        return labels.filter(label => label.canBeAppliedTo(arg1, arg2));
    }
    getLabels() {
        return this._labels;
    }
}
exports.MmixDocument = MmixDocument;
//# sourceMappingURL=MmixDocument.js.map