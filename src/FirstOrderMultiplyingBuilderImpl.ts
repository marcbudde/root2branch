import { LinearBuilder } from "./LinearBuilder";
import { FirstOrderMultiplyingBuilder } from "./FirstOrderMultiplyingBuilder";
import { HigherOrderMultiplyingBuilder } from "./HigherOrderMultiplyingBuilder";
import { LinearBuilderImpl } from "./LinearBuilderImpl";
import { BuilderFactory } from "./BuilderFactory";

/*
  T represents the data type for nodes produced by the current builder (also called dataOrigin)
*/
export class FirstOrderMultiplyingBuilderImpl<T, P> implements FirstOrderMultiplyingBuilder<T, P> {
  // Tupel aus [data object, from wich second element's payload has been derived;
  // builder with payload derived from first element])
  private siblings: Array<[T, LinearBuilder<P>]> = [];

  constructor(readonly parentBuilder: LinearBuilder<P>,
      dataList?: () => Array<T>, mapper?: (data: T) => P) {
    if(dataList && mapper) {
      for(let item of dataList()) {
        this.siblings.push([item,
          new LinearBuilderImpl<P>(parentBuilder).hookIn(mapper(item))]);
      }
    }
  }

  public branch(payload: P): HigherOrderMultiplyingBuilder<FirstOrderMultiplyingBuilder<T, P>, T, T, P> {
    return BuilderFactory.createHigherOrderMultiplyingBuilder(this,
      () => [<T>{}], (p) => payload);
  }

  public leaf(payload: P): FirstOrderMultiplyingBuilder<T, P> {
    return this.branch(payload).close();
  }

  public multibranch<U>(dataList: () => U[], boxInto: (data: U) => P):
      HigherOrderMultiplyingBuilder<FirstOrderMultiplyingBuilder<T, P>, T, U, P> {
    return BuilderFactory.createHigherOrderMultiplyingBuilder(this,
      (t) => dataList(), boxInto);
  }

  public multibranchOnSelection<U>(selection: (parentListItem: T) => U[], boxInto: (data: U) => P):
      HigherOrderMultiplyingBuilder<FirstOrderMultiplyingBuilder<T, P>, T, U, P> {
    return BuilderFactory.createHigherOrderMultiplyingBuilder(this,
      selection, boxInto);
  }

  public close(): LinearBuilder<P> {
    return this.parentBuilder;
  }

  linearParentSiblings(): Array<[T, LinearBuilder<P>]> {
    return this.siblings;
  }
}
