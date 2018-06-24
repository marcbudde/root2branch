import { TreeNode } from "./TreeNode";
import { LinearBuilder } from "./LinearBuilder";
import { FirstOrderMultiplyingBuilder } from "./FirstOrderMultiplyingBuilder";
import { HigherOrderMultiplyingBuilder } from "./HigherOrderMultiplyingBuilder";
import { LinearBuilderImpl } from "./LinearBuilderImpl";
import { MultiplyingBuilder } from "./MultiplyingBuilder";
import { BuilderFactory } from "./BuilderFactory";

export class HigherOrderMultiplyingBuilderImpl<B extends MultiplyingBuilder<T, P>, T, U, P>
    implements HigherOrderMultiplyingBuilder<B, T, U, P> {
  // Tupel aus [data object, from wich second element's payload has been derived;
  // builder with payload derived from first element])
  private siblings: Array<[U, LinearBuilder<P>]> = [];

  constructor(readonly parentBuilder: B,
      dataList: (parentDataItem: T) => Array<U>, mapper: (data: U) => P) {
    for(let linearParentSibling of parentBuilder.linearParentSiblings()) {
      for(let item of dataList(linearParentSibling[0])) {
        this.siblings.push([item,
          new LinearBuilderImpl<P>(linearParentSibling[1]).hookIn(mapper(item))]);
      }
    }
  }

  public branch(payload: P): HigherOrderMultiplyingBuilder<HigherOrderMultiplyingBuilder<B, T, U, P>, U, U, P> {
    return BuilderFactory.createHigherOrderMultiplyingBuilder(this,
      () => [<U>{}], (p) => payload);
  }

  public leaf(payload: P): HigherOrderMultiplyingBuilder<B, T, U, P> {
    return this.branch(payload).close();
  }

  public multibranch<V>(dataList: () => V[],
      boxInto: (data: V) => P): HigherOrderMultiplyingBuilder<HigherOrderMultiplyingBuilder<B, T, U, P>, U, V, P> {
    return BuilderFactory.createHigherOrderMultiplyingBuilder(this,
      (t) => dataList(), boxInto);
  }

  public multibranchOnSelection<V>(selection: (parentListItem: U) => V[],
      boxInto: (data: V) => P): HigherOrderMultiplyingBuilder<HigherOrderMultiplyingBuilder<B, T, U, P>, U, V, P> {
    return BuilderFactory.createHigherOrderMultiplyingBuilder(this,
      selection, boxInto);
  }

  public close(): B {
    return this.parentBuilder;
  }

  linearParentSiblings(): Array<[U, LinearBuilder<P>]> {
    return this.siblings;
  }
}
