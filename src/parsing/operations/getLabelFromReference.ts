import { LabelReference } from "../LabelReference";
import { Label } from "../Label";
export function getLabelFromReference(
  labelReference: LabelReference,
  labelDefinitions: Label[]
): Label | null {
  return labelDefinitions.find(x => x.name === labelReference.value) || null;
}
