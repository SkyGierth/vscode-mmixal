import { JumpLabel } from "./JumpLabel";
import { AliasLabel } from "./AliasLabel";
import { ILabel } from "./ILabel";
import * as vscode from "vscode";
export class LabelFactory {
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
