"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code belows
import * as vscode from "vscode";
import { MmixCompletionItemProvider } from "./MmixCompletionItemProvider";
import { MmixHoverProvider } from "./MmixHoverProvider";

const MMS_MODE: vscode.DocumentFilter = { language: "mms", scheme: "file" };

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("MMIX extension activated");

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      MMS_MODE,
      new MmixCompletionItemProvider(),
      ","
    )
  );

  context.subscriptions.push(
    vscode.languages.registerHoverProvider(MMS_MODE, new MmixHoverProvider())
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
