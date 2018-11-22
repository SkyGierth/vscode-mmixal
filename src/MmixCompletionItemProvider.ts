import { MmixDocumentParser } from "./MmixDocumentParser";
import * as vscode from "vscode";
import { InputStream } from "./parsing/InputStream";
import { TokenStream } from "./parsing/TokenStream";
export class MmixCompletionItemProvider
  implements vscode.CompletionItemProvider {
  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Thenable<vscode.CompletionItem[]> {
    const inputStream = new InputStream(document.getText());
    const tokenStream = new TokenStream(inputStream);

    try {
      while (!tokenStream.eof()) {
        const next = tokenStream.next();
        console.log(next);
      }
    } catch (e) {
      console.error(e);
    }

    const mmixDocument = MmixDocumentParser.parse(document);

    return Promise.resolve(
      mmixDocument
        .getMatchingLabels(position)
        .map(label => new vscode.CompletionItem(label.name))
    );
  }
}
