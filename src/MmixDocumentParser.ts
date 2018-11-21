import * as vscode from "vscode";
import { ILabelDefinition } from "./ILabelDefinition";
import { IStaticValue } from "./IStaticValue";
import { IOperation } from "./IOperation";
import { JumpLabelDefinition } from "./JumpLabelDefinition";
import { AliasLabelDefinition } from "./AliasLabelDefinition";
import { NumericStaticValue } from "./NumericStaticValue";
import { Register } from "./Register";
import { StringStaticValue } from "./StringStaticValue";
import { SetOperation } from "./SetOperation";
import { RegisterAlias } from "./RegisterAlias";
import { IsOperation } from "./IsOperation";
import { MissingRegister } from "./MissingRegister";
import { MissingStaticValue } from "./MissingStaticValue";
import { MmixDocument } from "./MmixDocument";
export class MmixDocumentParser {
  public static parse(textDocument: vscode.TextDocument): MmixDocument {
    const document = new MmixDocument();
    const lines = textDocument.getText().split("\n");
    for (let i = 0; i < lines.length; i++) {
      try {
        const line = lines[i];
        let match;
        // operation
        if (
          (match = line.match(
            /^(?:\w+)?[ \t]+([\w]+)[ \t]([ \t]*\S*[ \t]*)(?:[ \t]+(%.*))?[ \t]*$/
          ))
        ) {
          const operationCode = match[1];
          let operationArgs = match[2] != null ? match[2].split(",") : [];
          let operation: IOperation | null = null;
          const range = new vscode.Range(
            i,
            line.indexOf(operationCode),
            i,
            match[0].length
          );
          switch (operationCode) {
            case "SET":
              const registerRange = new vscode.Range(
                i,
                line.indexOf(operationCode) + operationCode.length + 1,
                i,
                line.indexOf(operationCode) +
                  operationCode.length +
                  2 +
                  operationArgs[0].length
              );
              let register = new MissingRegister(registerRange);
              if (operationArgs[0].trim().length > 0) {
                register = this.getRegister(
                  registerRange,
                  operationArgs[0].trim(),
                  document.segments
                    .filter(x => x instanceof AliasLabelDefinition)
                    .map(x => x as AliasLabelDefinition)
                );
              }
              let staticValue = new MissingStaticValue(
                new vscode.Range(i, 0, i, 0)
              );
              if (operationArgs[1]) {
                staticValue = this.getStaticValue(
                  operationArgs[1],
                  new vscode.Range(
                    i,
                    registerRange.end.character + 1,
                    i,
                    registerRange.end.character + 1 + operationArgs[1].length
                  )
                );
              }
              operation = new SetOperation(
                range,
                match[0].trim(),
                operationCode,
                register,
                staticValue
              );
              break;
          }
          if (operation) {
            document.segments.push(operation);
          }
        }
        // label
        if ((match = line.match(/(^\w+)[ \t]+([\w]+)[ \t]+([^\n%]+)/))) {
          let label: ILabelDefinition;
          const range = new vscode.Range(i, 0, i, match[0].trim().length);
          const operationRange = new vscode.Range(
            i,
            match[1].length +
              match[0].substring(match[1].length).indexOf(match[2]),
            i,
            match[0].trim().length
          );
          if (match[2] === "IS") {
            const staticValueRange = new vscode.Range(
              i,
              match[0]
                .substring(operationRange.start.character + 2)
                .indexOf(match[3]) +
                operationRange.start.character +
                2,
              i,
              match[0].length
            );
            const staticValue = this.getStaticValue(match[3], staticValueRange);
            const isOperation = new IsOperation(
              operationRange,
              match[2] + " " + match[3],
              staticValue
            );
            label = new AliasLabelDefinition(
              range,
              match[1],
              isOperation,
              match[2] + " " + match[3],
              match[3]
            );
          } else {
            label = new JumpLabelDefinition(
              match[1],
              new IsOperation(
                operationRange,
                "TEST",
                this.getStaticValue("1234567890", operationRange)
              ),
              operationRange,
              "TEST"
            );
          }
          document.segments.push(label);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return document;
  }
  private static getStaticValue(
    text: string,
    range: vscode.Range
  ): IStaticValue {
    let match;
    if ((match = text.match(/"([^"]+)"/))) {
      return new StringStaticValue(range, text, match[1], match[1]);
    }
    if ((match = text.match(/#(-?[\da-fA-F]+)/))) {
      return new NumericStaticValue(
        range,
        text,
        text,
        parseInt("0x" + match[1])
      );
    }
    if ((match = text.match(/\$(\d+)/))) {
      return new Register(range, text, text, parseInt(match[1]));
    }
    return new NumericStaticValue(range, text, text, +text);
  }
  private static getRegister(
    range: vscode.Range,
    text: string,
    labelDefinitions: AliasLabelDefinition[]
  ): Register {
    let register: number = -1;
    const labelDefinition = labelDefinitions.find(
      def =>
        def.definition instanceof IsOperation &&
        def.definition.value instanceof Register &&
        def.name === text
    );
    if (labelDefinition) {
      return new RegisterAlias(range, text, text, labelDefinition);
    } else {
      try {
        register = parseInt(text.substring(1));
      } catch {}
    }
    return new Register(range, text, text, register);
  }
}
