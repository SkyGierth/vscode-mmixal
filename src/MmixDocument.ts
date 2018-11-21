import { operators } from "./operators";
import { ILabel } from "./ILabel";
import { LabelFactory } from "./LabelFactory";
import { IOperator } from "./IOperator";
import * as vscode from "vscode";
export class MmixDocument {
  private _labels: ILabel[];
  constructor(public textDocument: vscode.TextDocument) {
    const lines = this.textDocument.getText().split("\n");
    const lineMatches = lines
      .map((line, i) => ({
        line: i + 1,
        match: line.match(/^(\w+)\s+(\S+)\s*(\S*)/)
      }))
      .filter(({ match }) => match !== null);
    const lineData = lineMatches.map(({ line, match }) => ({
      name: match![1],
      def1: match![2],
      def2: match![3],
      line
    }));
    this._labels = lineData.map(labelData =>
      LabelFactory.createLabel(
        labelData,
        new vscode.Position(labelData.line, 0)
      )
    );
  }
  private getLine(position: vscode.Position): string {
    return this.textDocument.getText(
      new vscode.Range(position.line, 0, position.line + 1, 0)
    );
  }
  public getOperator(position: vscode.Position): IOperator | null {
    const line = this.getLine(position);
    const operatorMatch = line.match(/^(?:[ \t]+|\w+[ \t]+)(\w+)/);
    if (operatorMatch) {
      const operatorName = operatorMatch[1];
      return operators.find(op => op.name === operatorName) || null;
    }
    return null;
  }
  public getOperatorArgPosition(position: vscode.Position): number {
    const line = this.getLine(position);
    const lineBegin = line.substring(0, position.character);
    return lineBegin.split(",").length - 1;
  }
  public getMatchingLabels(position: vscode.Position): ILabel[];
  public getMatchingLabels(operator: IOperator, argPosition: number): ILabel[];
  public getMatchingLabels(
    arg1: vscode.Position | IOperator,
    arg2?: number
  ): ILabel[] {
    const labels = this.getLabels();
    if (arg1 instanceof vscode.Position) {
      const operator = this.getOperator(arg1);
      const operatorArgPosition = this.getOperatorArgPosition(arg1);
      if (operator === null) {
        return [];
      }
      return this.getMatchingLabels(operator, operatorArgPosition);
    }
    if (arg2 === undefined) {
      return [];
    }
    return labels.filter(label => label.canBeAppliedTo(arg1, arg2));
  }
  public getLabels(): ILabel[] {
    return this._labels;
  }
}
