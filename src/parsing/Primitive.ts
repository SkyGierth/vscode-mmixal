import { Element } from "./Element";
export abstract class Primitive<T = any> extends Element {
  public abstract value: T;
}