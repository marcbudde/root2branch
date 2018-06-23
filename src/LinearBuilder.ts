import { TreeNode } from "./TreeNode";
import { FirstOrderMultiplyingBuilder } from "./FirstOrderMultiplyingBuilder";
import { ToLinearBuilderCloseable } from "./ToLinearBuilderCloseable";

export interface LinearBuilder<P> extends ToLinearBuilderCloseable<P> {
  node: TreeNode<P>;
  branch(payload: P): LinearBuilder<P>;
  leaf(payload: P): LinearBuilder<P>;
  multibranch<T>(dataList: () => Array<T>,
      mapper: (data: T) => P): FirstOrderMultiplyingBuilder<T, P>
}
