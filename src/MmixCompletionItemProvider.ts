import { MmixDocument } from "./MmixDocument";
import * as vscode from "vscode";
export class MmixCompletionItemProvider
  implements vscode.CompletionItemProvider {
  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Thenable<vscode.CompletionItem[]> {
    const mmixDocument = new MmixDocument(document);
    return Promise.resolve(
      mmixDocument
        .getMatchingLabels(position)
        .map(label => new vscode.CompletionItem(label.name))
    );
  }
}
