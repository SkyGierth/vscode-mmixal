import * as vscode from "vscode";
import { Program } from "./parsing/Program";
import { Label } from "./parsing/Label";
import { Operation } from "./parsing/Operation";
import { IsOperation } from "./parsing/TokenParser";

export class MmixDocument {
  constructor(private _program: Program) {

  }

  public getMatchingLabels(position: vscode.Position): Label[] {
    const currentElement = this._program.operations.find(o => o.range.contains(position));

    if (currentElement && currentElement instanceof Operation || currentElement instanceof Label) {
      let operation: Operation;
      if (currentElement instanceof Label) {
        operation = currentElement.definition;
      }else {
        operation = currentElement;
      }

      const labels = this._program.operations.filter(x => x instanceof Label && x.range.end.compareTo(position) < 0) as Label[];

      let currentArgument = operation.operationArguments.findIndex(x => x.range.contains(position));
      currentArgument = currentArgument < 0 ? 0 : currentArgument;

      return labels.filter(x => x.definition instanceof IsOperation && operation.isMatchingArgument(x.definition.arg, currentArgument, labels));
    }

    return [];
  }
}
