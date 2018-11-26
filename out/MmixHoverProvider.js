"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const InputStream_1 = require("./parsing/InputStream");
const TokenStream_1 = require("./parsing/TokenStream");
const TokenParser_1 = require("./parsing/TokenParser");
const MmixDocument_1 = require("./MmixDocument");
const LabelReference_1 = require("./parsing/LabelReference");
const Register_1 = require("./parsing/Register");
const Operation_1 = require("./parsing/Operation");
class MmixHoverProvider {
    provideHover(document, position, token) {
        let result = null;
        try {
            const inputStream = new InputStream_1.InputStream(document.getText());
            const tokenStream = new TokenStream_1.TokenStream(inputStream);
            const parser = new TokenParser_1.TokenParser(tokenStream);
            const program = parser.parse();
            const mmixDocument = new MmixDocument_1.MmixDocument(program);
            const currentElement = mmixDocument.getElementAt(position);
            if (currentElement && currentElement instanceof LabelReference_1.LabelReference) {
                const label = mmixDocument.getLabelDefinition(currentElement);
                if (label) {
                    if (label.definition instanceof TokenParser_1.IsOperation) {
                        let definition = label.definition.arg.value;
                        if (label.definition.arg instanceof Register_1.Register) {
                            definition = "$" + definition;
                        }
                        else if (label.definition.arg instanceof String) {
                            definition = '"' + definition + '"';
                        }
                        result = new vscode.Hover(`**${label.name}** = ${definition}`, currentElement.range);
                    }
                    else {
                        result = new vscode.Hover(`**${label.name}** = ${label.definition.operationCode} ${label.definition.operationArguments
                            .map(x => x.value)
                            .join(", ")}`, currentElement.range);
                    }
                }
            }
            else if (currentElement instanceof Operation_1.Operation &&
                currentElement.description) {
                result = new vscode.Hover(`**${currentElement.operationCode}**: ${currentElement.description}`);
            }
        }
        catch (error) {
            console.error(error);
        }
        return result;
    }
}
exports.MmixHoverProvider = MmixHoverProvider;
//# sourceMappingURL=MmixHoverProvider.js.map