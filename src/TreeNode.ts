export class TreeNode <P> {
  parent?: TreeNode<P>;
  children?: Array<TreeNode<P>> = [];
  constructor(public data: P) {}
}
