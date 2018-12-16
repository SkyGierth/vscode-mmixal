import { Primitive } from "../Primitive";
import { LabelReference } from "../LabelReference";
import { Register } from "../Register";
import { Label } from "../Label";
import { getLabelFromReference } from "./getLabelFromReference";
export function isRegister(element: Primitive, labelDefinitions: Label[] = []) {
  if (element instanceof Register) {
    return true;
  }
  if (element instanceof LabelReference) {
    const labelDefinition = getLabelFromReference(element, labelDefinitions);
    if (labelDefinition && labelDefinition.definition instanceof Register) {
      return true;
    }
  }
  return false;
}
