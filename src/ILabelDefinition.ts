import { ICodeSegment } from "./ICodeSegment";
export interface ILabelDefinition extends ICodeSegment {
  name: string;
  definition: ICodeSegment;
}
