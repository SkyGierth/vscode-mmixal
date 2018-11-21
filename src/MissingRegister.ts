import * as vscode from "vscode";
import { Register } from "./Register";
export class MissingRegister extends Register {
  constructor(range: vscode.Range) {
    super(range, "MISSING", "MISSING", -1);
  }
}
