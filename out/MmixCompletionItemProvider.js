"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MmixDocumentParser_1 = require("./MmixDocumentParser");
const vscode = require("vscode");
class MmixCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        const mmixDocument = MmixDocumentParser_1.MmixDocumentParser.parse(document);
        return Promise.resolve(mmixDocument
            .getMatchingLabels(position)
            .map(label => new vscode.CompletionItem(label.name)));
    }
}
exports.MmixCompletionItemProvider = MmixCompletionItemProvider;
//# sourceMappingURL=MmixCompletionItemProvider.js.map