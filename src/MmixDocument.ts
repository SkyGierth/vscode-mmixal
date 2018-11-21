import * as vscode from "vscode";
import { ICodeSegment } from "./ICodeSegment";
import { ILabelDefinition } from "./ILabelDefinition";
import { AliasLabelDefinition } from "./AliasLabelDefinition";
import { SetOperation } from "./SetOperation";

export class MmixDocument {
  public segments: ICodeSegment[] = [];

  public getMatchingLabels(position: vscode.Position): ILabelDefinition[] {
    const currentSegment = this.segments.find(segment =>
      segment.range.contains(position)
    );

    if (currentSegment instanceof SetOperation) {
      if (currentSegment.register.range.contains(position)) {
        return this.segments
          .filter(segment => segment instanceof AliasLabelDefinition)
          .map(segment => segment as AliasLabelDefinition);
      }
    }

    return [];
  }
}
