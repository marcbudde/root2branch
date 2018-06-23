import {MultiplyingBuilder} from "./MultiplyingBuilder";
import {FirstOrderMultiplyingBuilder} from './FirstOrderMultiplyingBuilder';

export interface HigherOrderMultiplyingBuilder<B extends MultiplyingBuilder<T, P>, T, U, P> extends MultiplyingBuilder<U, P> {
  branch(payload: P): HigherOrderMultiplyingBuilder<HigherOrderMultiplyingBuilder<B, T, U, P>, U, U, P>;
  leaf(payload: P): HigherOrderMultiplyingBuilder<B, T, U, P>;
  multibranch<V>(dataList: () => Array<V>,
      boxInto: (data: V) => P): HigherOrderMultiplyingBuilder<HigherOrderMultiplyingBuilder<B, T, U, P>, U, V, P>;
  multibranchOnSelection<V>(selection: (parentListItem: U) => Array<V>,
    	boxInto: (data: V) => P) : HigherOrderMultiplyingBuilder<HigherOrderMultiplyingBuilder<B, T, U, P>, U, V, P>;
  close(): B;
}
