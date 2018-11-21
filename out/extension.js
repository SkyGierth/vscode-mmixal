"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code belows
const vscode = require("vscode");
const MmixCompletionItemProvider_1 = require("./MmixCompletionItemProvider");
const MMS_MODE = { language: "mms", scheme: "file" };
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log("MMIX extension activated");
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(MMS_MODE, new MmixCompletionItemProvider_1.MmixCompletionItemProvider(), ","));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map