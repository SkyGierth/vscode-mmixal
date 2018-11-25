"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const InputStream_1 = require("./parsing/InputStream");
const TokenStream_1 = require("./parsing/TokenStream");
const TokenParser_1 = require("./parsing/TokenParser");
const MmixDocument_1 = require("./MmixDocument");
class MmixCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        let results = [];
        try {
            const inputStream = new InputStream_1.InputStream(document.getText());
            const tokenStream = new TokenStream_1.TokenStream(inputStream);
            const parser = new TokenParser_1.TokenParser(tokenStream);
            const program = parser.parse();
            const mmixDocument = new MmixDocument_1.MmixDocument(program);
            results = mmixDocument
                .getMatchingLabels(position)
                .map(label => new vscode.CompletionItem(label.name, vscode.CompletionItemKind.Constant));
        }
        catch (error) {
            console.error(error);
        }
        return Promise.resolve(results);
    }
}
exports.MmixCompletionItemProvider = MmixCompletionItemProvider;
//# sourceMappingURL=MmixCompletionItemProvider.js.map