import {TreeNode} from "./TreeNode";
import {ITreeBuilder} from "./ITreeBuilder";
import {IDynaTreeBuilder} from "./IDynaTreeBuilder";
import {IToDynaTreeCloseable} from "./IToDynaTreeCloseable";
import {TreeBuilder} from "./TreeBuilder";


/*
  T represents the data type for nodes produced by the current builder (also called dataOrigin)
*/
export class DynaTreeBuilder<T, P> extends TreeBuilder<P> implements IDynaTreeBuilder<T, P> {
  node: TreeNode<P>;
  private siblings: Array<[T, ITreeBuilder<P>]> = [];
  private childDelegates: Array<IDynaTreeBuilder<T, P>> = [];

  constructor(readonly parentBuilder: ITreeBuilder<P>,
      dataList: () => Array<T>, mapper: (data: T) => P) {
    super(parentBuilder);
    if(dataList) {
      for(let item of dataList()) {
        this.siblings.push([item,
          this.branchAt(this.parentBuilder, mapper(item))]);
      }
    }
  }

  public branch(payload: P): IToDynaTreeCloseable<T, P> {
    return this.branchMapped(t => payload);
  }

  public branchMapped(elementTransform:(data:T) => P): IToDynaTreeCloseable<T, P> {
    for(let i in this.siblings) {
      if(this.childDelegates.length > 0) {
        this.childDelegates[i].branchMapped(elementTransform);
      }
      else {
        this.siblings[i][1] = this.siblings[i][1]
            .branch(elementTransform.apply(this.siblings[i][0]));
      }
    }
    return ;
  }

  close(): IDynaTreeBuilder<T, P> {
    throw new Error("Method not implemented.");
  }
}
