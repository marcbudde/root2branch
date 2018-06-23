import { TreeNode } from "./TreeNode";
import { LinearBuilder } from "./LinearBuilder";
import { FirstOrderMultiplyingBuilder } from "./FirstOrderMultiplyingBuilder";
import { BuilderFactory } from "./BuilderFactory";
/*
  P represents the data type of payload objects
*/
export class LinearBuilderImpl<P> implements LinearBuilder<P> {
  node: TreeNode<P>;

  constructor(readonly parentBuilder: LinearBuilder<P>) {}

  /*
    Hooks in a new node with given payload in the place of this builder.
  */
  hookIn(payload: P): LinearBuilder<P> {
    this.node = new TreeNode(payload);
    if(this.parentBuilder != null) {
      this.node.parent = this.parentBuilder.node;
      this.parentBuilder.node.children.push(this.node);
    }
    return this;
  }

  public branch(payload: P): LinearBuilder<P> {
    return new LinearBuilderImpl<P>(this).hookIn(payload);
  }

  public leaf(payload: P): LinearBuilder<P> {
    return this.branch(payload).close();
  }

  public multibranch<T>(dataList: () => Array<T>,
      mapper: (data: T) => P): FirstOrderMultiplyingBuilder<T, P> {
    if(dataList() && dataList().length) {
      return BuilderFactory.createFirstOrderMultiplyingBuilder(this, dataList, mapper);
    }
    return BuilderFactory.createEmptyFirstOrderMultiplyingBuilder(this);
  }

  /*
    Closes this branch und returns to parent level. close() on root will
    return to root itself.
  */
  public close(): LinearBuilder<P> {
    return this.parentBuilder || this;
  }
}
