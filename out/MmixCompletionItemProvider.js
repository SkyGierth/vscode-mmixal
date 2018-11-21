"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MmixDocument_1 = require("./MmixDocument");
const vscode = require("vscode");
class MmixCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        const mmixDocument = new MmixDocument_1.MmixDocument(document);
        return Promise.resolve(mmixDocument
            .getMatchingLabels(position)
            .map(label => new vscode.CompletionItem(label.name)));
    }
}
exports.MmixCompletionItemProvider = MmixCompletionItemProvider;
//# sourceMappingURL=MmixCompletionItemProvider.js.map