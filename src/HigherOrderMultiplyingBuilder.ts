import {MultiplyingBuilder} from "./MultiplyingBuilder";
import {FirstOrderMultiplyingBuilder} from './FirstOrderMultiplyingBuilder';

export interface HigherOrderMultiplyingBuilder<T, U, P> extends MultiplyingBuilder<U, P> {
  close(): FirstOrderMultiplyingBuilder<T, P>;
}
