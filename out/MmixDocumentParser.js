"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const JumpLabelDefinition_1 = require("./JumpLabelDefinition");
const AliasLabelDefinition_1 = require("./AliasLabelDefinition");
const NumericStaticValue_1 = require("./NumericStaticValue");
const Register_1 = require("./Register");
const StringStaticValue_1 = require("./StringStaticValue");
const SetOperation_1 = require("./SetOperation");
const RegisterAlias_1 = require("./RegisterAlias");
const IsOperation_1 = require("./IsOperation");
const MissingRegister_1 = require("./MissingRegister");
const MissingStaticValue_1 = require("./MissingStaticValue");
const MmixDocument_1 = require("./MmixDocument");
class MmixDocumentParser {
    static parse(textDocument) {
        const document = new MmixDocument_1.MmixDocument();
        const lines = textDocument.getText().split("\n");
        for (let i = 0; i < lines.length; i++) {
            try {
                const line = lines[i];
                let match;
                // operation
                if ((match = line.match(/^(?:\w+)?[ \t]+([\w]+)[ \t]([ \t]*\S*[ \t]*)(?:[ \t]+(%.*))?[ \t]*$/))) {
                    const operationCode = match[1];
                    let operationArgs = match[2] != null ? match[2].split(",") : [];
                    let operation = null;
                    const range = new vscode.Range(i, line.indexOf(operationCode), i, match[0].length);
                    switch (operationCode) {
                        case "SET":
                            const registerRange = new vscode.Range(i, line.indexOf(operationCode) + operationCode.length + 1, i, line.indexOf(operationCode) +
                                operationCode.length +
                                2 +
                                operationArgs[0].length);
                            let register = new MissingRegister_1.MissingRegister(registerRange);
                            if (operationArgs[0].trim().length > 0) {
                                register = this.getRegister(registerRange, operationArgs[0].trim(), document.segments
                                    .filter(x => x instanceof AliasLabelDefinition_1.AliasLabelDefinition)
                                    .map(x => x));
                            }
                            let staticValue = new MissingStaticValue_1.MissingStaticValue(new vscode.Range(i, 0, i, 0));
                            if (operationArgs[1]) {
                                staticValue = this.getStaticValue(operationArgs[1], new vscode.Range(i, registerRange.end.character + 1, i, registerRange.end.character + 1 + operationArgs[1].length));
                            }
                            operation = new SetOperation_1.SetOperation(range, match[0].trim(), operationCode, register, staticValue);
                            break;
                    }
                    if (operation) {
                        document.segments.push(operation);
                    }
                }
                // label
                if ((match = line.match(/(^\w+)[ \t]+([\w]+)[ \t]+([^\n%]+)/))) {
                    let label;
                    const range = new vscode.Range(i, 0, i, match[0].trim().length);
                    const operationRange = new vscode.Range(i, match[1].length +
                        match[0].substring(match[1].length).indexOf(match[2]), i, match[0].trim().length);
                    if (match[2] === "IS") {
                        const staticValueRange = new vscode.Range(i, match[0]
                            .substring(operationRange.start.character + 2)
                            .indexOf(match[3]) +
                            operationRange.start.character +
                            2, i, match[0].length);
                        const staticValue = this.getStaticValue(match[3], staticValueRange);
                        const isOperation = new IsOperation_1.IsOperation(operationRange, match[2] + " " + match[3], staticValue);
                        label = new AliasLabelDefinition_1.AliasLabelDefinition(range, match[1], isOperation, match[2] + " " + match[3], match[3]);
                    }
                    else {
                        label = new JumpLabelDefinition_1.JumpLabelDefinition(match[1], new IsOperation_1.IsOperation(operationRange, "TEST", this.getStaticValue("1234567890", operationRange)), operationRange, "TEST");
                    }
                    document.segments.push(label);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        return document;
    }
    static getStaticValue(text, range) {
        let match;
        if ((match = text.match(/"([^"]+)"/))) {
            return new StringStaticValue_1.StringStaticValue(range, text, match[1], match[1]);
        }
        if ((match = text.match(/#(-?[\da-fA-F]+)/))) {
            return new NumericStaticValue_1.NumericStaticValue(range, text, text, parseInt("0x" + match[1]));
        }
        if ((match = text.match(/\$(\d+)/))) {
            return new Register_1.Register(range, text, text, parseInt(match[1]));
        }
        return new NumericStaticValue_1.NumericStaticValue(range, text, text, +text);
    }
    static getRegister(range, text, labelDefinitions) {
        let register = -1;
        const labelDefinition = labelDefinitions.find(def => def.definition instanceof IsOperation_1.IsOperation &&
            def.definition.value instanceof Register_1.Register &&
            def.name === text);
        if (labelDefinition) {
            return new RegisterAlias_1.RegisterAlias(range, text, text, labelDefinition);
        }
        else {
            try {
                register = parseInt(text.substring(1));
            }
            catch (_a) { }
        }
        return new Register_1.Register(range, text, text, register);
    }
}
exports.MmixDocumentParser = MmixDocumentParser;
//# sourceMappingURL=MmixDocumentParser.js.map