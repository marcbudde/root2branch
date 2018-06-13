import {TreeNode} from "./TreeNode";
import {ITreeBuilder} from "./ITreeBuilder";
import {IDynaTreeBuilder} from "./IDynaTreeBuilder";
import {BuilderFactory} from "./BuilderFactory";
/*
  P represents the data type of payload objects
*/
export class TreeBuilder<P> implements ITreeBuilder<P> {
  node: TreeNode<P>;

  constructor(readonly parentBuilder: ITreeBuilder<P>) {
  }

  /*
    Hooks in a new node with given payload in the place of this builder.
  */
  hookIn(payload: P): ITreeBuilder<P> {
    this.node = new TreeNode(payload);
    if(this.parentBuilder != null) {
      this.node.parent = this.parentBuilder.node;
      this.parentBuilder.node.children.push(this.node);
    }
    return this;
  }

  public branch(payload: P): ITreeBuilder<P> {
    return this.branchAt(this, payload);
  }

  branchAt(parentBuilder: ITreeBuilder<P>, payload: P): ITreeBuilder<P> {
    return new TreeBuilder<P>(parentBuilder).hookIn(payload);
  }

  /*
    Closes this branch und returns to parent level. close() on root will
    return to root itself.
  */
  public close(): ITreeBuilder<P> {
    return this.parentBuilder || this;
  }

  public leaf(payload: P): ITreeBuilder<P> {
    return this.branch(payload).close();
  }

  public multibranch<T>(dataList: () => Array<T>,
      mapper: (data: T) => P): IDynaTreeBuilder<T, P> {
    if(dataList() && dataList().length) {
      return BuilderFactory.createDynaTreeBuilder(this, dataList, mapper);
    }
    return BuilderFactory.createEmptyDynaTreeBuilder(this);
  }
}
