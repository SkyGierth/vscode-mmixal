import * as vscode from "vscode";
import { InputStream } from "./parsing/InputStream";
import { TokenStream } from "./parsing/TokenStream";
import { TokenParser } from "./parsing/TokenParser";
import { MmixDocument } from "./MmixDocument";
export class MmixCompletionItemProvider
  implements vscode.CompletionItemProvider {
  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Thenable<vscode.CompletionItem[]> {
    let results: vscode.CompletionItem[] = [];

    try {
      const inputStream = new InputStream(document.getText());
      const tokenStream = new TokenStream(inputStream);
      const parser = new TokenParser(tokenStream);

      const program = parser.parse();

      const mmixDocument = new MmixDocument(program);

      results = mmixDocument
        .getMatchingLabels(position)
        .map(
          label =>
            new vscode.CompletionItem(
              label.name,
              vscode.CompletionItemKind.Constant
            )
        );
    } catch (error) {
      console.error(error);
    }

    return Promise.resolve(results);
  }
}
