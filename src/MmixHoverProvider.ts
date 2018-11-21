import * as vscode from "vscode";

export class MmixHoverProvider implements vscode.HoverProvider {
  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
    // const mmixDocument = new MmixDocument(document);

    // const operator = mmixDocument.getOperator(position);

    return new vscode.Hover("Lorem ipsum");
  }
}
