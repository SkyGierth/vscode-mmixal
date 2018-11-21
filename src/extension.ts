"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code belows
import * as vscode from "vscode";

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
}

// this method is called when your extension is deactivated
export function deactivate() {}

class MmixCompletionItemProvider implements vscode.CompletionItemProvider {
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

class MmixDocument {
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

interface IOperator {
  name: string;
  operatorArgs: OperatorArgument[];
  description?: string;
}

class Operator implements IOperator {
  constructor(
    public name: string,
    public operatorArgs: OperatorArgument[],
    public description?: string | undefined
  ) {}
}

enum OperatorArgument {
  Register = 1,
  Numeric = 2,
  String = 4,
  Address = 8,
  NumericOrRegister = Register | Numeric,
  Value = NumericOrRegister | String
}

class LabelFactory {
  public static createLabel(
    labelData: {
      name: string;
      def1: string;
      def2: string;
    },
    position: vscode.Position
  ): ILabel {
    const { name, def1, def2 } = labelData;

    if (def1 === "IS") {
      return new AliasLabel(position, name, def2);
    } else {
      return new JumpLabel(position, name);
    }
  }
}

interface ILabel {
  definition: vscode.Position;
  name: string;

  canBeAppliedTo(operator: IOperator, argPos: number): boolean;
}

class AliasLabel implements ILabel {
  public canBeAppliedTo(operator: IOperator, argPos: number): boolean {
    return true;
  }
  constructor(
    public definition: vscode.Position,
    public name: string,
    public aliasFor: string
  ) {}
}

class JumpLabel implements ILabel {
  constructor(public definition: vscode.Position, public name: string) {}

  public canBeAppliedTo(operator: IOperator, argPos: number): boolean {
    return operator.operatorArgs[argPos] === OperatorArgument.Address;
  }
}

const operators: IOperator[] = [
  new Operator(
    "LDA",
    [OperatorArgument.Register, OperatorArgument.Address],
    "Loads an address to a register"
  ),
  new Operator("SET", [OperatorArgument.Register, OperatorArgument.Value])
];
