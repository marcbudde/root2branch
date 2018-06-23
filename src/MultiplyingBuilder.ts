import { FirstOrderMultiplyingBuilder } from "./FirstOrderMultiplyingBuilder";
import { HigherOrderMultiplyingBuilder } from "./HigherOrderMultiplyingBuilder";
import { LinearBuilder } from "./LinearBuilder";

export interface MultiplyingBuilder<T, P> {
  branch(payload: P): HigherOrderMultiplyingBuilder<MultiplyingBuilder<T, P>, T, T, P>;
  leaf(payload: P): MultiplyingBuilder<T, P>;
  multibranch<U>(dataList: () => Array<U>,
      boxInto: (data: U) => P): HigherOrderMultiplyingBuilder<MultiplyingBuilder<T, P>, T, U, P>;
  multibranchOnSelection<U>(selection: (parentListItem: T) => Array<U>,
    	boxInto: (data: U) => P) : HigherOrderMultiplyingBuilder<MultiplyingBuilder<T, P>, T, U, P>;

  linearParentSiblings(): Array<[T, LinearBuilder<P>]>;
}
