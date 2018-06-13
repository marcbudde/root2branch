import {TreeNode} from "./TreeNode";
import {IDynaTreeBuilder} from "./IDynaTreeBuilder";

export interface ITreeBuilder<P> {
  node: TreeNode<P>;

  branch(payload: P): ITreeBuilder<P>;
  leaf(payload: P): ITreeBuilder<P>;
  close(): ITreeBuilder<P>;
  multibranch<T>(dataList: () => Array<T>,
      mapper: (data: T) => P): IDynaTreeBuilder<T, P>
}
