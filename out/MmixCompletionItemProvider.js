"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MmixDocumentParser_1 = require("./MmixDocumentParser");
const vscode = require("vscode");
const InputStream_1 = require("./parsing/InputStream");
const TokenStream_1 = require("./parsing/TokenStream");
class MmixCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        const inputStream = new InputStream_1.InputStream(document.getText());
        const tokenStream = new TokenStream_1.TokenStream(inputStream);
        try {
            while (!tokenStream.eof()) {
                const next = tokenStream.next();
                console.log(next);
            }
        }
        catch (e) {
            console.error(e);
        }
        const mmixDocument = MmixDocumentParser_1.MmixDocumentParser.parse(document);
        return Promise.resolve(mmixDocument
            .getMatchingLabels(position)
            .map(label => new vscode.CompletionItem(label.name)));
    }
}
exports.MmixCompletionItemProvider = MmixCompletionItemProvider;
//# sourceMappingURL=MmixCompletionItemProvider.js.map