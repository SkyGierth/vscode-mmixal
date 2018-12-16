import { LabelReference } from "../LabelReference";
import { Label } from "../Label";
import { Number } from "../Number";
import { Element } from "../Element";
import { getLabelFromReference } from "./getLabelFromReference";
export function isNumber(element: Element, labelDefinitions: Label[]) {
  if (element instanceof Number) {
    return true;
  }
  if (element instanceof LabelReference) {
    const labelDefinition = getLabelFromReference(element, labelDefinitions);
    if (
      labelDefinition &&
      isNumber(labelDefinition.definition, labelDefinitions)
    ) {
      return true;
    }
  }
  return false;
}
