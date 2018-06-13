import {TreeNode} from "./TreeNode";
import {ITreeBuilder} from "./ITreeBuilder";
import {IDynaTreeBuilder} from "./IDynaTreeBuilder";
import {IToDynaTreeCloseable} from "./IToDynaTreeCloseable";
import {DynaTreeBuilder} from "./DynaTreeBuilder";

export class SubDynaTreeBuilder<T, P> implements IToDynaTreeCloseable<T, P> {
  node: TreeNode<P>;

  constructor(readonly wrappedBuilder: IDynaTreeBuilder<T, P>) {}

  branch(payload: P): IToDynaTreeCloseable<T, P> {
    return this.wrappedBuilder.branch(payload);
  }

  branchMapped(elementTransform: (data: T) => P): IToDynaTreeCloseable<T, P> {
    return this.wrappedBuilder.branchMapped(elementTransform);
  }

  multibranch<T>(dataList: () => T[], mapper: (data: T) => P): IDynaTreeBuilder<T, P> {
    return this.wrappedBuilder.multibranch(dataList, mapper);
  }

  public close(): IDynaTreeBuilder<T, P> {
    return this.wrappedBuilder.close();
  }

  leaf(payload: P): ITreeBuilder<P> {
    this.wrappedBuilder.leaf(payload);
		return this;
  }
}
