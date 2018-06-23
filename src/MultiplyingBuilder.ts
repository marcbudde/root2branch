import { FirstOrderMultiplyingBuilder } from "./FirstOrderMultiplyingBuilder";
import { HigherOrderMultiplyingBuilder } from "./HigherOrderMultiplyingBuilder";

export interface MultiplyingBuilder<T, P> {
  branch(payload: P): HigherOrderMultiplyingBuilder<T, T, P>;
  leaf(payload: P): MultiplyingBuilder<T, P>;
  multibranch<U>(dataList: () => Array<U>,
      boxInto: (data: U) => P): HigherOrderMultiplyingBuilder<T, U, P>;
  multibranchOnSelection<U>(selection: (parentListItem: T) => Array<U>,
    	boxInto: (data: U) => P) : HigherOrderMultiplyingBuilder<T, U, P>;
}
