import { TreeNode } from "./TreeNode";
import { LinearBuilder } from "./LinearBuilder";
import { FirstOrderMultiplyingBuilder } from "./FirstOrderMultiplyingBuilder";
import { HigherOrderMultiplyingBuilder } from "./HigherOrderMultiplyingBuilder";
import { LinearBuilderImpl } from "./LinearBuilderImpl";
import { MultiplyingBuilder } from "./MultiplyingBuilder";

export class HigherOrderMultiplyingBuilderImpl<T, U, P>
    implements HigherOrderMultiplyingBuilder<T, U, P> {
  // Tupel aus [data object, from wich second element's payload has been derived;
  // builder with payload derived from first element])
  private siblings: Array<[U, LinearBuilder<P>]> = [];

  constructor(readonly parentBuilder: FirstOrderMultiplyingBuilder<T, P>,
      dataList: (parentDataItem: T) => Array<U>, mapper: (data: U) => P) {
    for(let linearParentSibling of parentBuilder.linearParentSiblings()) {
      if(dataList) {
        for(let item of dataList(linearParentSibling[0])) {
          this.siblings.push([item,
            new LinearBuilderImpl<P>(linearParentSibling[1]).hookIn(mapper(item))]);
        }
      }
    }
  }

  public branch(payload: P): HigherOrderMultiplyingBuilder<U, U, P> {
    throw new Error("Method not implemented.");
  }

  public leaf(payload: P): MultiplyingBuilder<U, P> {
    throw new Error("Method not implemented.");
  }

  public multibranch<V>(dataList: () => V[],
      boxInto: (data: V) => P): HigherOrderMultiplyingBuilder<U, V, P> {
    throw new Error("Method not implemented.");
  }

  public multibranchOnSelection<V>(dataList: (parentListItem: U) => V[],
      boxInto: (data: V) => P): HigherOrderMultiplyingBuilder<U, V, P> {
    throw new Error("Method not implemented.");
  }

  public close(): FirstOrderMultiplyingBuilder<T, P> {
    return this.parentBuilder;
  }
}
