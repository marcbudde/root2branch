import { FirstOrderMultiplyingBuilderImpl } from "./FirstOrderMultiplyingBuilderImpl";
import { LinearBuilderImpl } from "./LinearBuilderImpl";
import { EmptyFirstOrderMultiplyingBuilderImpl } from "./EmptyFirstOrderMultiplyingBuilderImpl";
import { LinearBuilder } from "./LinearBuilder";
import { FirstOrderMultiplyingBuilder } from "./FirstOrderMultiplyingBuilder";
import { HigherOrderMultiplyingBuilderImpl } from "./HigherOrderMultiplyingBuilderImpl";
import { HigherOrderMultiplyingBuilder } from "./HigherOrderMultiplyingBuilder";

export class BuilderFactory {
  public static seed <P> (payload: P): LinearBuilder<P> {
    return new LinearBuilderImpl<P>(null).hookIn(payload);
  }

  static createFirstOrderMultiplyingBuilder<T, P>(
      builderToWrap: LinearBuilder<P>,
      dataList: () => Array<T>,
      mapper: (data: T) => P): FirstOrderMultiplyingBuilder<T, P> {
    return new FirstOrderMultiplyingBuilderImpl<T, P>(builderToWrap,
        dataList, mapper)
  }

  static createEmptyFirstOrderMultiplyingBuilder<T, P>(
      builderToWrap: LinearBuilder<P>) : FirstOrderMultiplyingBuilder<T, P> {
    return new EmptyFirstOrderMultiplyingBuilderImpl<T, P>(builderToWrap);
  }

  static createHigherOrderMultiplyingBuilder<T, U, P>(
      parentBuilder: FirstOrderMultiplyingBuilder<T, P>,
      selection: (parentDataItem: T) => Array<U>,
      mapper: (data: U) => P): HigherOrderMultiplyingBuilder<T, U, P> {
    return new HigherOrderMultiplyingBuilderImpl<T, U, P>(parentBuilder,
        selection, mapper)
  }
}
