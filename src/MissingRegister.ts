import * as vscode from "vscode";
import { Register } from "./parsing/Register";
export class MissingRegister extends Register {
  constructor(range: vscode.Range) {
    super(-1, range);
  }
}
