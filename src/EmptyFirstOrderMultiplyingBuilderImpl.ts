import { LinearBuilder } from "./LinearBuilder";
import { FirstOrderMultiplyingBuilder } from "./FirstOrderMultiplyingBuilder";
import { FirstOrderMultiplyingBuilderImpl } from "./FirstOrderMultiplyingBuilderImpl";

export class EmptyFirstOrderMultiplyingBuilderImpl<T, P>
    extends FirstOrderMultiplyingBuilderImpl<T, P> implements FirstOrderMultiplyingBuilder<T, P> {
  constructor(readonly parentBuilder: LinearBuilder<P>) {
    super(parentBuilder, null, null);
  }
}
