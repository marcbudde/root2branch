import { ToLinearBuilderCloseable } from "./ToLinearBuilderCloseable";
import { MultiplyingBuilder } from "./MultiplyingBuilder";
import { LinearBuilder } from "./LinearBuilder";

export interface FirstOrderMultiplyingBuilder<T, P> extends MultiplyingBuilder<T, P>, ToLinearBuilderCloseable<P> {
  leaf(payload: P): FirstOrderMultiplyingBuilder<T, P>;
  linearParentSiblings(): Array<[T, LinearBuilder<P>]>;
}
