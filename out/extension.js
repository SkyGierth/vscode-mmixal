"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code belows
const vscode = require("vscode");
const MMS_MODE = { language: "mms", scheme: "file" };
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log("MMIX extension activated");
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(MMS_MODE, new MmixCompletionItemProvider(), ","));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
class MmixCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        const mmixDocument = new MmixDocument(document);
        return Promise.resolve(mmixDocument
            .getMatchingLabels(position)
            .map(label => new vscode.CompletionItem(label.name)));
    }
}
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
        this._labels = lineData.map(labelData => LabelFactory.createLabel(labelData, new vscode.Position(labelData.line, 0)));
    }
    getLine(position) {
        return this.textDocument.getText(new vscode.Range(position.line, 0, position.line + 1, 0));
    }
    getOperator(position) {
        const line = this.getLine(position);
        const operatorMatch = line.match(/^(?:[ \t]+|\w+[ \t]+)(\w+)/);
        if (operatorMatch) {
            const operatorName = operatorMatch[1];
            return operators.find(op => op.name === operatorName) || null;
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
class Operator {
    constructor(name, operatorArgs, description) {
        this.name = name;
        this.operatorArgs = operatorArgs;
        this.description = description;
    }
}
var OperatorArgument;
(function (OperatorArgument) {
    OperatorArgument[OperatorArgument["Register"] = 1] = "Register";
    OperatorArgument[OperatorArgument["Numeric"] = 2] = "Numeric";
    OperatorArgument[OperatorArgument["String"] = 4] = "String";
    OperatorArgument[OperatorArgument["Address"] = 8] = "Address";
    OperatorArgument[OperatorArgument["NumericOrRegister"] = 3] = "NumericOrRegister";
    OperatorArgument[OperatorArgument["Value"] = 7] = "Value";
})(OperatorArgument || (OperatorArgument = {}));
class LabelFactory {
    static createLabel(labelData, position) {
        const { name, def1, def2 } = labelData;
        if (def1 === "IS") {
            return new AliasLabel(position, name, def2);
        }
        else {
            return new JumpLabel(position, name);
        }
    }
}
class AliasLabel {
    constructor(definition, name, aliasFor) {
        this.definition = definition;
        this.name = name;
        this.aliasFor = aliasFor;
    }
    canBeAppliedTo(operator, argPos) {
        return true;
    }
}
class JumpLabel {
    constructor(definition, name) {
        this.definition = definition;
        this.name = name;
    }
    canBeAppliedTo(operator, argPos) {
        return operator.operatorArgs[argPos] === OperatorArgument.Address;
    }
}
const operators = [
    new Operator("LDA", [OperatorArgument.Register, OperatorArgument.Address], "Loads an address to a register"),
    new Operator("SET", [OperatorArgument.Register, OperatorArgument.Value])
];
//# sourceMappingURL=extension.js.map