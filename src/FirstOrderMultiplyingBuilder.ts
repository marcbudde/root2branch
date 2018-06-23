import { ToLinearBuilderCloseable } from "./ToLinearBuilderCloseable";
import { MultiplyingBuilder } from "./MultiplyingBuilder";
import { LinearBuilder } from "./LinearBuilder";
import { HigherOrderMultiplyingBuilder } from "./HigherOrderMultiplyingBuilder";

export interface FirstOrderMultiplyingBuilder<T, P> extends MultiplyingBuilder<T, P>, ToLinearBuilderCloseable<P> {
  branch(payload: P): HigherOrderMultiplyingBuilder<FirstOrderMultiplyingBuilder<T, P>, T, T, P>;
  leaf(payload: P): FirstOrderMultiplyingBuilder<T, P>;
  multibranch<U>(dataList: () => Array<U>,
      boxInto: (data: U) => P): HigherOrderMultiplyingBuilder<FirstOrderMultiplyingBuilder<T, P>, T, U, P>;
  multibranchOnSelection<U>(selection: (parentListItem: T) => Array<U>,
    	boxInto: (data: U) => P) : HigherOrderMultiplyingBuilder<FirstOrderMultiplyingBuilder<T, P>, T, U, P>;
}
