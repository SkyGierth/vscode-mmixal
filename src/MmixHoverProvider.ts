import * as vscode from "vscode";
import { InputStream } from "./parsing/InputStream";
import { TokenStream } from "./parsing/TokenStream";
import { TokenParser, IsOperation } from "./parsing/TokenParser";
import { MmixDocument } from "./MmixDocument";
import { LabelReference } from "./parsing/LabelReference";
import { Register } from "./parsing/Register";
import { Operation } from "./parsing/Operation";

export class MmixHoverProvider implements vscode.HoverProvider {
  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
    let result: vscode.Hover | null = null;

    try {
      const inputStream = new InputStream(document.getText());
      const tokenStream = new TokenStream(inputStream);
      const parser = new TokenParser(tokenStream);

      const program = parser.parse();

      const mmixDocument = new MmixDocument(program);

      const currentElement = mmixDocument.getElementAt(position);

      if (currentElement && currentElement instanceof LabelReference) {
        const label = mmixDocument.getLabelDefinition(currentElement);
        if (label) {
          if (label.definition instanceof IsOperation) {
            let definition = label.definition.arg.value;
            if (label.definition.arg instanceof Register) {
              definition = "$" + definition;
            } else if (label.definition.arg instanceof String) {
              definition = '"' + definition + '"';
            }

            result = new vscode.Hover(
              `**${label.name}** = ${definition}`,
              currentElement.range
            );
          } else {
            result = new vscode.Hover(
              `**${label.name}** = ${
                label.definition.operationCode
              } ${label.definition.operationArguments
                .map(x => x.value)
                .join(", ")}`,
              currentElement.range
            );
          }
        }
      } else if (
        currentElement instanceof Operation &&
        currentElement.description
      ) {
        result = new vscode.Hover(
          `**${currentElement.operationCode}**: ${currentElement.description}`
        );
      }
    } catch (error) {
      console.error(error);
    }
    return result;
  }
}
