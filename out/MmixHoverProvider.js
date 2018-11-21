"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class MmixHoverProvider {
    provideHover(document, position, token) {
        // const mmixDocument = new MmixDocument(document);
        // const operator = mmixDocument.getOperator(position);
        return new vscode.Hover("Lorem ipsum");
    }
}
exports.MmixHoverProvider = MmixHoverProvider;
//# sourceMappingURL=MmixHoverProvider.js.map